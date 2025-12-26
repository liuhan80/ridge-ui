const tar = require('tar'),
    fs = require('fs-extra'),
    path = require('path'),
    { shortid } = require('./utils.js');

// 上传文件, 删除文件
module.exports = class FileManager {
    constructor(app) {
        this.config = app.config
    }

    async initRoutes({ context, router, services }) {
        // 业务数据模型管理
        // 创建节点
        router.post('/sxfile/upload', this.upload.bind(this));
        // 删除节点
        // router.post('/app/file/delete', this.delete.bind(this));
    }

    /**
     * 上传一个文件，返回一个地址
     * 通过这个地址可以定位文件
     * @param {*} ctx 
     * @param {*} next 
     */
    async upload(ctx, next) {
        try {
            const baseStorePath = this.config.storePath;
            const file = ctx.request.files?.file; // 可选链避免文件不存在时报错

            // 1. 校验文件是否存在
            if (!file) {
                ctx.status = 400;
                ctx.body = {
                    result: 'error',
                    message: '未上传文件'
                };
                return await next();
            }

            // 2. 生成当前日期的目录路径（格式：年/月/日）
            const now = new Date();
            const year = String(now.getFullYear()); // 年（如2025）
            const month = String(now.getMonth() + 1).padStart(2, '0'); // 月（补零，如12）
            const day = String(now.getDate()).padStart(2, '0'); // 日（补零，如26）
            // 拼接日期目录（如：storePath/2025/12/26）
            const dateDir = path.join(baseStorePath, year, month, day);

            // 3. 确保日期目录存在（不存在则递归创建）
            if (!fs.existsSync(dateDir)) {
                fs.mkdirSync(dateDir, { recursive: true }); // recursive: true 支持多级目录创建
            }

            // 4. 拼接最终的文件路径（日期目录 + 原文件名）
            const filePath = path.join(dateDir, file.name || file.originalFilename );
            // 可选：如果需要避免同名文件覆盖，可保留你注释的重命名逻辑
            // const suffix = file.name.split('.').pop();
            // const newFilename = `${Date.now()}-${shortid.generate()}.${suffix}`;
            // const filePath = path.join(dateDir, newFilename);

            // 5. 写入文件（改用流写入，避免大文件占用过多内存）
            // 替代 fs.readFileSync + fs.writeFileSync（同步读取整个文件到内存）
            fs.copyFileSync(file.filepath, filePath); // 更高效的文件复制，兼容大文件

            // 6. 返回结果（filePath 为完整存储路径，也可返回相对路径）
            ctx.body = {
                result: 'ok',
                fileName: file.originalFilename,
                // filePath, // 最终路径：如 /store/2025/12/26/test.jpg
                relativePath: path.relative(baseStorePath, filePath), // 相对路径：2025/12/26/test.jpg（可选）
                message: 'file uploaded'
            };
        } catch (error) {
            // 异常捕获：避免程序崩溃，返回错误信息
            ctx.status = 500;
            console.error('upload error', error);
            ctx.body = {
                result: 'error',
                message: `文件上传失败：${error.message}`,
                error: process.env.NODE_ENV === 'development' ? error.stack : '' // 开发环境返回堆栈
            };
        }
        await next();
    }
};
