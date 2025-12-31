const fs = require('fs-extra');
const path = require('path');

// 上传/读取/删除 JSON 文件的存储服务
module.exports = class JSONStorageService {
    constructor(app) {
        this.config = app.config;
        // 基础存储目录（从配置读取，默认当前目录下的 jsonStore）
        this.baseStorePath = path.resolve(this.config.storePath || process.cwd(), 'jsonStore');
        this.initRoutes(app);
    }

    // 初始化路由
    async initRoutes({ router }) {
        router.post('/json/set', this.setJSON.bind(this));
        router.get('/json/get', this.getJSON.bind(this));
        router.delete('/json/delete', this.deleteJSON.bind(this)); // 补充删除接口
    }

    /**
     * 写入 JSON 文件接口
     * @param {Koa.Context} ctx - Koa 上下文
     * @param {Function} next - Koa 中间件下一步
     */
    async setJSON(ctx, next) {
        try {
            // 1. 获取请求参数（支持 form-data/json 格式）
            const { key, data } = ctx.request.body;
            
            // 2. 参数校验
            if (!key) {
                ctx.status = 400;
                ctx.body = { code: 400, message: '参数 key 不能为空（JSON 文件名）' };
                return;
            }
            if (data === undefined) {
                ctx.status = 400;
                ctx.body = { code: 400, message: '参数 data 不能为空（JSON 数据）' };
                return;
            }

            // 3. 确保存储目录存在（不存在则创建）
            await fs.ensureDir(this.baseStorePath);

            // 4. 拼接文件路径（防止路径穿越，仅保留文件名）
            const safeKey = path.basename(key); // 过滤路径符号，仅保留纯文件名
            const jsonFilePath = path.resolve(this.baseStorePath, `${safeKey}.json`);

            // 5. 序列化并写入 JSON 文件（格式化输出，便于阅读）
            await fs.writeJson(jsonFilePath, data, { spaces: 2 });

            // 6. 返回成功响应
            ctx.status = 200;
            ctx.body = {
                code: 200,
                message: 'JSON 文件写入成功',
                data: { key: safeKey, path: jsonFilePath }
            };

            await next();
        } catch (error) {
            // 异常处理
            console.error('写入 JSON 文件失败：', error);
            ctx.status = 500;
            ctx.body = {
                code: 500,
                message: 'JSON 文件写入失败',
                error: error.message
            };
        }
    }

    /**
     * 读取 JSON 文件接口
     * @param {Koa.Context} ctx - Koa 上下文
     * @param {Function} next - Koa 中间件下一步
     */
    async getJSON(ctx, next) {
        try {
            // 1. 获取请求参数（GET 接口从 query 取 key）
            const { key } = ctx.request.query;
            
            // 2. 参数校验
            if (!key) {
                ctx.status = 400;
                ctx.body = { code: 400, message: '参数 key 不能为空（JSON 文件名）' };
                return;
            }

            // 3. 拼接文件路径（安全处理）
            const safeKey = path.basename(key);
            const jsonFilePath = path.resolve(this.baseStorePath, `${safeKey}.json`);

            // 4. 检查文件是否存在
            const fileExists = await fs.pathExists(jsonFilePath);
            if (!fileExists) {
                ctx.status = 404;
                ctx.body = { code: 404, message: `不存在 key 为 ${safeKey} 的 JSON 文件` };
                return;
            }

            // 5. 读取并解析 JSON 文件
            const jsonData = await fs.readJson(jsonFilePath);

            // 6. 返回成功响应
            ctx.status = 200;
            ctx.body = {
                code: 200,
                message: 'JSON 文件读取成功',
                data: jsonData
            };

            await next();
        } catch (error) {
            console.error('读取 JSON 文件失败：', error);
            ctx.status = 500;
            ctx.body = {
                code: 500,
                message: 'JSON 文件读取失败',
                error: error.message
            };
        }
    }

    /**
     * 补充：删除 JSON 文件接口
     * @param {Koa.Context} ctx - Koa 上下文
     * @param {Function} next - Koa 中间件下一步
     */
    async deleteJSON(ctx, next) {
        try {
            // 1. 获取删除的 key
            const { key } = ctx.request.query;
            if (!key) {
                ctx.status = 400;
                ctx.body = { code: 400, message: '参数 key 不能为空（JSON 文件名）' };
                return;
            }

            // 2. 安全拼接路径
            const safeKey = path.basename(key);
            const jsonFilePath = path.resolve(this.baseStorePath, `${safeKey}.json`);

            // 3. 检查文件是否存在
            const fileExists = await fs.pathExists(jsonFilePath);
            if (!fileExists) {
                ctx.status = 404;
                ctx.body = { code: 404, message: `不存在 key 为 ${safeKey} 的 JSON 文件` };
                return;
            }

            // 4. 删除文件
            await fs.remove(jsonFilePath);

            // 5. 返回响应
            ctx.status = 200;
            ctx.body = {
                code: 200,
                message: `JSON 文件 ${safeKey} 删除成功`
            };

            await next();
        } catch (error) {
            console.error('删除 JSON 文件失败：', error);
            ctx.status = 500;
            ctx.body = {
                code: 500,
                message: 'JSON 文件删除失败',
                error: error.message
            };
        }
    }
};