const tar = require('tar'),
    fs = require('fs-extra'),
    path = require('path'),
    { shortid } = require('./utils.js');

// 定义支持浏览器直接预览的文件类型（MIME Type）
const PREVIEWABLE_TYPES = {
    // 图片类型
    'image/jpeg': true,
    'image/png': true,
    'image/gif': true,
    'image/bmp': true,
    'image/webp': true,
    'image/svg+xml': true,
    // PDF
    'application/pdf': true,
    // 文本类（可选，如需要预览文本/JSON）
    'text/plain': true,
    'application/json': true,
    'text/html': true
};

// 获取文件的MIME Type
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.bmp':
            return 'image/bmp';
        case '.webp':
            return 'image/webp';
        case '.svg':
            return 'image/svg+xml';
        case '.pdf':
            return 'application/pdf';
        case '.txt':
            return 'text/plain';
        case '.json':
            return 'application/json';
        case '.html':
            return 'text/html';
        // 其他类型默认二进制流
        default:
            return 'application/octet-stream';
    }
}

// 上传文件, 删除文件
module.exports = class FileManager {
    constructor(app) {
        this.config = app.config
    }
    async initRoutes({ context, router, services }) {
        // 业务数据模型管理
        // 创建节点
        router.post('/sxfile/upload', this.upload.bind(this));

        router.get('/sxfile/download', this.download.bind(this));
        // 删除节点
        // router.post('/app/file/delete', this.delete.bind(this));
    }
       /**
     * 文件下载/预览方法
     * @param {*} ctx Koa上下文
     * @param {*} next 中间件下一步
     * 调用示例：/sxfile/download?relativePath=2025/12/26/test.jpg （预览）
     *          /sxfile/download?relativePath=2025/12/26/test.zip&download=1 （强制下载）
     */
       async download(ctx, next) {
        try {
            const baseStorePath = this.config.storePath;
            // 1. 获取请求参数：relativePath（文件相对路径）、download（是否强制下载）
            const { relativePath, download = 0 } = ctx.query;

            // 2. 校验参数
            if (!relativePath) {
                ctx.status = 400;
                ctx.body = {
                    result: 'error',
                    message: '缺少文件路径参数（relativePath）'
                };
                return await next();
            }

            // 3. 拼接完整文件路径（防止路径遍历攻击）
            // 关键：使用 path.resolve + path.relative 确保路径在 baseStorePath 内，避免越权访问
            const fullFilePath = path.resolve(baseStorePath, relativePath);
            const relativeToBase = path.relative(baseStorePath, fullFilePath);
            // 如果解析后的路径不在 baseStorePath 内，拒绝访问
            if (relativeToBase.startsWith('..') || path.isAbsolute(relativeToBase)) {
                ctx.status = 403;
                ctx.body = {
                    result: 'error',
                    message: '文件路径非法，禁止访问'
                };
                return await next();
            }

            // 4. 校验文件是否存在
            if (!fs.existsSync(fullFilePath)) {
                ctx.status = 404;
                ctx.body = {
                    result: 'error',
                    message: '文件不存在'
                };
                return await next();
            }

            // 5. 获取文件信息（大小、MIME类型）
            const fileStat = fs.statSync(fullFilePath);
            const mimeType = getMimeType(fullFilePath);
            const fileName = path.basename(fullFilePath);

            // 6. 设置响应头（核心：区分预览/下载）
            ctx.response.set({
                'Content-Type': mimeType, // 设置正确的MIME类型
                'Content-Length': fileStat.size, // 文件大小（便于浏览器进度显示）
                'Cache-Control': 'public, max-age=86400', // 缓存1天（可选）
            });

            // 7. 判断是否强制下载，或是否为不支持预览的文件类型
            const isForceDownload = Number(download) === 1 || !PREVIEWABLE_TYPES[mimeType];
            if (isForceDownload) {
                // 强制下载：设置 Content-Disposition 为 attachment
                ctx.response.set({
                    'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
                    // 兼容IE浏览器
                    'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`
                });
            } else {
                // 支持预览：设置 Content-Disposition 为 inline
                ctx.response.set({
                    'Content-Disposition': `inline; filename="${encodeURIComponent(fileName)}"`,
                    'Content-Disposition': `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`
                });
            }

            // 8. 流式返回文件（避免大文件占用内存）
            // 核心：使用 createReadStream 流式传输，而非 readFileSync
            const fileStream = fs.createReadStream(fullFilePath);
            ctx.body = fileStream; // Koa 支持直接返回流

        } catch (error) {
            // 全局异常捕获
            ctx.status = 500;
            console.error('download error', error);
            ctx.body = {
                result: 'error',
                message: `文件下载/预览失败：${error.message}`,
                error: process.env.NODE_ENV === 'development' ? error.stack : ''
            };
        }
        await next();
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
            const file = ctx.request.files?.file; 
    
            // 1. 校验文件是否存在
            if (!file) {
                ctx.status = 400;
                ctx.body = {
                    result: 'error',
                    message: '未上传文件'
                };
                return await next();
            }
    
            // 2. 生成多级唯一目录（年/月/日/毫秒+随机数）
            const now = new Date();
            const year = String(now.getFullYear());
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            
            // 生成毫秒级唯一标识（时间戳+随机数，避免同毫秒上传冲突）
            const uniqueDirName = `${Date.now()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            
            // 完整目录路径：baseStorePath/2025/12/26/1735240000000-1234
            const uploadDir = path.join(baseStorePath, year, month, day, uniqueDirName);
    
            // 3. 确保目录存在（递归创建）
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            // 4. 拼接文件路径（唯一目录 + 原始文件名，避免重名覆盖）
            const originalFileName = file.originalFilename || file.name || `unknown-${Date.now()}`;
            // 处理特殊字符（可选：避免文件名含非法字符导致的问题）
            const safeFileName = originalFileName.replace(/[\\/:*?"<>|]/g, '_');
            const filePath = path.join(uploadDir, safeFileName);
    
            // 5. 写入文件（流复制，兼容大文件）
            fs.copyFileSync(file.filepath, filePath);
    
            // 6. 返回结果（包含可解析的相对路径 + 原始文件名）
            const relativePath = path.relative(baseStorePath, filePath); // 格式：2025/12/26/1735240000000-1234/测试.jpg
            
            ctx.body = {
                result: 'ok',
                originalFileName: originalFileName, // 直接返回原始文件名（最直观）
                safeFileName: safeFileName, // 处理后的安全文件名
                relativePath: relativePath, // 唯一路径，可拆分获取文件名
                // 额外：提供解析文件名的辅助字段
                fileNameFromPath: path.basename(relativePath), // 从路径提取文件名
                message: 'file uploaded'
            };
        } catch (error) {
            ctx.status = 500;
            console.error('upload error', error);
            ctx.body = {
                result: 'error',
                message: `文件上传失败：${error.message}`,
                error: process.env.NODE_ENV === 'development' ? error.stack : ''
            };
        }
        await next();
    }
};
