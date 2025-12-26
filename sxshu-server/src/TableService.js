const fs = require('fs-extra'),
    path = require('path'),
    { shortid } = require('./utils.js');

// 上传文件, 删除文件
module.exports = class TableService {
    constructor(app, appName) {
        this.app = app; // 修正：保存app实例，避免getCollection中this.app未定义
        this.config = app.config;
        // 确保 NeDB 数据存储目录存在
        this.dbBasePath = path.resolve(this.config.storePath || './data', 'nedb');
        fs.ensureDirSync(this.dbBasePath);
        this.appName = appName
        this.initRoutes(app);
    }

    /**
     * 获取指定表名的 NeCollection 实例（单例模式，避免重复创建）
     * @param {string} tableName 表名
     * @returns {NeCollection}
     */
    getCollection(tableName) {
        if (!tableName) {
            throw new Error('表名不能为空');
        }
        return this.app.dbProvider.getCollection(this.appName, tableName);
    }

    async initRoutes({ context, router, services }) {
        const that = this; // 保存 this 上下文，避免路由回调中丢失

        // 1. 表格查询：支持查询条件、排序、分页
        router.get('/coll/:tableName/list', async (ctx, next) => {
            try {
                const { tableName } = ctx.params;
                // 解析查询参数（解构出分页和排序相关字段，剩余参数放到restQuery）
                const {
                    sort: sortField = '', // 排序字段名（如 createTime）
                    order = -1,           // 排序方向：1升序/-1降序（默认降序）
                    current = 1,          // 页码，默认第1页
                    pageSize = 10,        // 每页条数，默认10条
                    ...restQuery          // 剩余所有query参数作为查询条件
                } = ctx.query;

                // ========== 1. 处理查询条件：将restQuery转为查询对象 ==========
                const queryObj = {};
                // 遍历剩余query参数，过滤空值并转换类型（适配数字/布尔等）
                Object.entries(restQuery).forEach(([key, value]) => {
                    // 跳过空值（空字符串/undefined/null）
                    if (value === '' || value === undefined || value === null) return;
                    
                    // 尝试转换类型：数字/布尔/JSON字符串 → 对应类型，否则保留字符串
                    let parsedValue = value;
                    try {
                        // 处理数字（如 age=18 → 18，而非"18"）
                        if (!isNaN(Number(value))) {
                            parsedValue = Number(value);
                        }
                        // 处理布尔值（如 isEnable=true → true）
                        else if (value.toLowerCase() === 'true') {
                            parsedValue = true;
                        } else if (value.toLowerCase() === 'false') {
                            parsedValue = false;
                        }
                        // 处理JSON格式的查询值（如 range={"$gt":10,"$lt":20}）
                        else if (value.startsWith('{') && value.endsWith('}')) {
                            parsedValue = JSON.parse(value);
                        }
                    } catch (e) {
                        // 解析失败则保留原始字符串（如普通文本）
                        parsedValue = value;
                    }
                    queryObj[key] = parsedValue;
                });

                // ========== 2. 处理排序规则：组装sortObj ==========
                const sortObj = {};
                if (sortField) {
                    // 确保order是数字类型（1/-1）
                    const sortOrder = ['1', '-1'].includes(String(order)) ? Number(order) : -1;
                    sortObj[sortField] = sortOrder;
                }
                // 无排序字段时，sortObj为空（使用数据库默认排序）

                // ========== 3. 计算分页参数 ==========
                const skip = (Number(current) - 1) * Number(pageSize);
                const limit = Number(pageSize);

                // ========== 4. 数据库查询 ==========
                const collection = await that.getCollection(tableName);
                const list = await collection.find(queryObj, {
                    sort: sortObj,
                    skip,
                    limit
                });
                const total = await collection.count(queryObj);

                // ========== 5. 返回结果 ==========
                ctx.body = {
                    code: "0",
                    msg: "成功",
                    items: list,
                    count: total,
                    pageSize: limit,
                    current: Number(current),
                };
            } catch (error) {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    success: false,
                    message: `查询失败：${error.message}`,
                    error: process.env.NODE_ENV === 'development' ? error.stack : ''
                };
            }
            await next();
        });

        // 2. 创建记录：返回唯一id（主键统一为_id）
        router.post('/coll/:tableName/doc/create', async (ctx, next) => {
            try {
                const { tableName } = ctx.params;
                const body = ctx.request.body || {};

                // 补全默认字段：主键统一用_id，无则生成
                const createData = {
                    ...body,
                    _id: body._id || shortid('10'), // 强制使用_id作为主键
                };

                // 获取集合并插入
                const collection = await that.getCollection(tableName);
                const result = await collection.insert(createData);

                // 返回结果（核心返回 _id）
                ctx.body = {
                    code:"0",
                    msg: "成功",
                    data: {
                        id: result._id // 对外返回id，内部统一用_id
                    },
                    message: '创建成功'
                };
            } catch (error) {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    success: false,
                    message: `创建失败：${error.message}`,
                    error: process.env.NODE_ENV === 'development' ? error.stack : ''
                };
            }
            await next();
        });

        // 3. 更新记录：body 传入 _id（主键）
        router.post('/coll/:tableName/doc/update', async (ctx, next) => {
            try {
                const { tableName } = ctx.params;
                const { _id, ...updateData } = ctx.request.body || {};

                // 校验 _id（主键）
                if (!_id) {
                    ctx.status = 400;
                    ctx.body = {
                        code: 400,
                        success: false,
                        message: '更新失败：_id 不能为空'
                    };
                    return await next();
                }

                // 补全更新时间
                // updateData.updateTime = new Date();

                // 获取集合并更新（$set 只更新指定字段）
                const collection = await that.getCollection(tableName);
                const result = await collection.update(
                    _id, // 按_id更新
                    { $set: updateData },
                    { multi: false, upsert: false } // 只更新1条，不存在不插入
                );

                // 返回结果
                ctx.body = {
                    code:"0",
                    msg: "成功",
                    data: {
                        affectedCount: result // 受影响的条数
                    },
                    message: result > 0 ? '更新成功' : '暂无数据更新'
                };
            } catch (error) {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    success: false,
                    message: `更新失败：${error.message}`,
                    error: process.env.NODE_ENV === 'development' ? error.stack : ''
                };
            }
            await next();
        });

        // 4. 删除记录：路径参数传入 _id
        router.delete('/coll/:tableName/doc/:id', async (ctx, next) => {
            try {
                const { tableName, id } = ctx.params;
                const _id = id; // 路径参数id映射为内部主键_id

                // 校验 _id
                if (!_id) {
                    ctx.status = 400;
                    ctx.body = {
                        code: 400,
                        success: false,
                        message: '删除失败：_id 不能为空'
                    };
                    return await next();
                }

                // 获取集合并删除
                const collection = await that.getCollection(tableName);
                const result = await collection.remove(_id);

                // 返回结果
                ctx.body = {
                    code:"0",
                    msg: "成功",
                    data: {
                        deletedCount: result // 删除的条数
                    },
                    message: result > 0 ? '删除成功' : '暂无数据删除'
                };
            } catch (error) {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    success: false,
                    message: `删除失败：${error.message}`,
                    error: process.env.NODE_ENV === 'development' ? error.stack : ''
                };
            }
            await next();
        });

        // 5. 获取记录详情：路径参数传入 _id
        router.get('/coll/:tableName/doc/:id', async (ctx, next) => {
            try {
                const { tableName, id } = ctx.params;
                const _id = id; // 路径参数id映射为内部主键_id

                // 校验 _id
                if (!_id) {
                    ctx.status = 400;
                    ctx.body = {
                        code: 400,
                        success: false,
                        message: '查询失败：_id 不能为空'
                    };
                    return await next();
                }

                // 获取集合并查询详情
                const collection = await that.getCollection(tableName);
                const detail = await collection.findOne(_id);

                // 返回结果
                ctx.body = {
                    code:"0",
                    msg: "成功",
                    data: detail || null,
                    message: detail ? '查询成功' : '暂无该记录'
                };
            } catch (error) {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    success: false,
                    message: `查询失败：${error.message}`,
                    error: process.env.NODE_ENV === 'development' ? error.stack : ''
                };
            }
            await next();
        });

        // 5. 批量删除记录：按查询条件删除多个文档
        router.delete('/coll/:tableName/doc/batchremove', async (ctx, next) => {
            try {
                const { tableName } = ctx.params;
                const queryObj = ctx.request.query || {};
                // 3. 禁止空条件删除（防止误删全表）
                if (Object.keys(queryObj).length === 0) {
                    ctx.status = 400;
                    ctx.body = {
                        code: "400",
                        msg: "失败",
                        data: {},
                        message: '删除失败：禁止使用空条件批量删除（防止误删全表）'
                    };
                    return await next();
                }

                // 4. 获取集合并批量删除
                const collection = await that.getCollection(tableName);
                // 调用NeCollection的remove方法，传入查询条件对象（支持批量删除）
                const result = await collection.remove(queryObj, { multi: true });

                // 5. 返回结果（保持和单个删除统一的返回格式）
                ctx.body = {
                    code: "0",
                    msg: "成功",
                    data: {
                        deletedCount: result // 删除的总条数
                    },
                    message: result > 0 ? `批量删除成功，共删除${result}条记录` : '暂无符合条件的记录可删除'
                };
            } catch (error) {
                ctx.status = 500;
                ctx.body = {
                    code: "500",
                    msg: "失败",
                    data: {},
                    message: `批量删除失败：${error.message}`,
                    error: process.env.NODE_ENV === 'development' ? error.stack : ''
                };
            }
            await next();
        });


        // ========== 新增：批量导入 JSON 文件（支持新增/按_id更新） ==========
        router.post('/coll/:tableName/import', async (ctx, next) => {
            try {
                const { tableName } = ctx.params;
                // 1. 校验是否上传了文件
                const file = ctx.request.files?.file;
                if (!file) {
                    ctx.status = 400;
                    ctx.body = {
                        code: 400,
                        success: false,
                        message: '导入失败：请上传JSON文件'
                    };
                    return await next();
                }

                // 2. 校验文件类型（仅允许JSON）
                const fileExt = path.extname(file.name).toLowerCase();
                if (fileExt !== '.json') {
                    ctx.status = 400;
                    ctx.body = {
                        code: 400,
                        success: false,
                        message: '导入失败：仅支持JSON格式文件'
                    };
                    // 删除临时文件
                    await fs.unlink(file.path);
                    return await next();
                }

                // 3. 读取并解析JSON文件（必须是对象数组）
                let jsonData = [];
                try {
                    const fileContent = await fs.readFile(file.path, 'utf8');
                    jsonData = JSON.parse(fileContent);
                    // 校验格式：必须是数组，且数组项为对象
                    if (!Array.isArray(jsonData)) {
                        throw new Error('JSON文件内容必须是对象数组');
                    }
                    if (jsonData.length === 0) {
                        throw new Error('JSON文件内容不能为空数组');
                    }
                } catch (parseError) {
                    ctx.status = 400;
                    ctx.body = {
                        code: 400,
                        success: false,
                        message: `导入失败：JSON解析错误 - ${parseError.message}`
                    };
                    await fs.unlink(file.path);
                    return await next();
                }

                // 4. 处理数据：补全默认字段，统一主键为_id
                const now = new Date();
                const importData = jsonData.map(item => ({
                    ...item,
                    _id: item._id || shortid('10'), // 无_id则自动生成
                    createTime: item.createTime || now,
                    updateTime: now // 导入时更新时间为当前时间
                }));

                // 5. 批量导入（新增+更新：按_id存在则更新，不存在则新增）
                const collection = that.getCollection(tableName);
                let successCount = 0;
                let failCount = 0;
                const failItems = [];

                // 逐条处理（支持 Upsert：存在则更新，不存在则插入）
                for (const item of importData) {
                    try {
                        // 先查询是否存在该_id的记录
                        const existItem = await collection.findOne(item._id);
                        if (existItem) {
                            // 存在则更新（仅更新非主键字段）
                            const { _id, createTime, ...updateFields } = item;
                            await collection.update(
                                _id,
                                { $set: updateFields },
                                { multi: false, upsert: false }
                            );
                        } else {
                            // 不存在则新增
                            await collection.insert(item);
                        }
                        successCount++;
                    } catch (itemError) {
                        failCount++;
                        failItems.push({
                            _id: item._id,
                            error: itemError.message
                        });
                    }
                }

                // 6. 清理临时文件
                await fs.unlink(file.path);

                // 7. 返回导入结果
                ctx.body = {
                    code: 200,
                    success: true,
                    data: {
                        total: jsonData.length,
                        successCount,
                        failCount,
                        failItems: failCount > 0 ? failItems : null // 失败项仅在有失败时返回
                    },
                    message: `批量导入完成：成功${successCount}条，失败${failCount}条`
                };
            } catch (error) {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    success: false,
                    message: `批量导入失败：${error.message}`,
                    error: process.env.NODE_ENV === 'development' ? error.stack : ''
                };
            }
            await next();
        });
    }
};