const { BadRequestError, NotFoundError, ConflictError } = require('ridge-http');
const axios = require('axios'); // 引入axios用于转发请求

/*
* @Description: 应用及工程资源管理服务
*/
module.exports = class AppealService {
    constructor(app) {
        this.app = app;
    }

    async initRoutes({ router }) {
        router.get('/appeal/hello', async (ctx, next)=> {
            ctx.body = {
                "hello": 'Please Appeal'
            }
            await next();
        });

         // 路由1：返回当前请求的完整信息（请求头、URL、Body、Query等）
         router.all('/appeal/request-info', async (ctx, next) => {
            try {
                // 整理请求的核心信息
                const requestInfo = {
                    // 基础URL信息
                    url: {
                        fullUrl: ctx.href, // 完整URL（包含协议、域名、路径、query）
                        path: ctx.path, // 路径部分
                        origin: ctx.origin, // 域名部分
                        protocol: ctx.protocol, // 协议（http/https）
                        host: ctx.host, // 主机名
                    },
                    // 请求方法
                    method: ctx.method,
                    // Query参数（URL中的?xxx=xxx部分）
                    query: ctx.query,
                    // Body参数（POST/PUT等请求的请求体）
                    body: ctx.request.body || {},
                    // 请求头
                    headers: ctx.headers,
                    // 客户端IP
                    clientIp: ctx.ip,
                    // 请求时间
                    timestamp: new Date().toISOString()
                };

                // 返回请求信息
                ctx.body = {
                    code: 200,
                    message: '请求信息获取成功',
                    data: requestInfo
                };
                await next();
            } catch (error) {
                ctx.body = {
                    code: 500,
                    message: '获取请求信息失败',
                    error: error.message
                };
                ctx.status = 500;
                await next();
            }
        });
        
        // 路由2：转发请求到redirect参数指定的地址，透传所有信息
        router.all('/appeal/redirect', async (ctx, next) => {
            try {
                // 1. 校验redirect参数是否存在
                const { redirect } = ctx.query;
                if (!redirect) {
                    throw new BadRequestError('缺少必填参数：redirect（目标转发地址）');
                }

                // 2. 整理需要透传的信息
                // 移除redirect参数（避免传递给目标服务）
                const { redirect: _, ...forwardQuery } = ctx.query;
                // 请求头（过滤掉koa自带的host等可能冲突的头信息）
                const forwardHeaders = { ...ctx.headers };
                delete forwardHeaders.host; // 避免host冲突
                delete forwardHeaders['content-length']; // 由axios自动计算

                // 3. 构建转发请求的配置
                const forwardConfig = {
                    url: redirect,
                    method: ctx.method.toLowerCase(), // 转为小写（axios要求）
                    params: forwardQuery, // 透传query参数（除了redirect）
                    data: ctx.request.body || {}, // 透传body参数
                    headers: forwardHeaders, // 透传请求头
                    timeout: 30000, // 超时时间30秒
                    validateStatus: () => true // 不拦截任何状态码，原样返回
                };

                // 4. 发送转发请求
                const response = await axios(forwardConfig);

                // 5. 将目标服务的响应透传返回
                ctx.status = response.status; // 透传状态码
                // ctx.headers = response.headers; // 透传响应头
                ctx.body = response.data; // 透传响应体

                await next();
            } catch (error) {
                // 错误处理
                if (error instanceof BadRequestError) {
                    ctx.status = 400;
                    ctx.body = {
                        code: 400,
                        message: error.message
                    };
                } else if (error.isAxiosError) {
                    // 转发请求时的网络/目标服务错误
                    ctx.status = error.response?.status || 500;
                    ctx.body = {
                        code: ctx.status,
                        message: `转发请求失败：${error.message}`,
                        targetResponse: error.response?.data || {}
                    };
                } else {
                    ctx.status = 500;
                    ctx.body = {
                        code: 500,
                        message: '服务器内部错误',
                        error: error.message
                    };
                }
                await next();
            }
        });
    }
}
