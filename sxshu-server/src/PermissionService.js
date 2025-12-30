const { BadRequestError, NotFoundError, ConflictError } = require('ridge-http');
const axios = require('axios'); // 引入axios用于转发请求

/*
* @Description: 应用及工程资源管理服务
*/
module.exports = class PermissionService {
    constructor(app) {
        this.app = app;
        this.initRoutes(app);
        this.admins = this.app.config.admins?.split(',') || []
    }

    async initRoutes({ router }) {
        router.get('/appeal/hello', async (ctx, next) => {
            ctx.body = {
                "hello": 'Please Appeal'
            }
            await next();
        });

        router.get('/permision/resources', async (ctx, next) => {
            try {
                const userId = ctx.cookies.get('cookieUserid')
                // 调用权限接口（复用通用请求方法）
                const result = await this.authRequest({
                    method: 'get',
                    url: `https://api.ctgne.com/idp-service/v1.0/site/reportPermissionDlsc`,
                    params: { userId:  ctx.cookies.get('cookieUserid') || 'zhang_wei83' } // get参数放params
                });
                ctx.body = {
                    ...result,
                    isAdmin: this.admins.indexOf(userId) > -1,
                    userId
                }
            } catch (error) {
                ctx.body = {
                    success: false,
                    message: error.message || '获取权限失败',
                    code: error.code || 'PERMISSION_ERROR'
                };
                ctx.status = error.status || 500;
            }
            await next();
        });
    }
    
    /**
     * 通用鉴权请求方法（核心复用逻辑）
     * @param {Object} config - axios请求配置（method/url/params/data等）
     * @returns {Promise<Object>} 接口返回的业务数据
     * @throws {Error} 所有失败场景抛出明确错误
     */
    async authRequest(config) {
        // 封装实际的请求逻辑，便于重试
        const doRequest = async () => {
            // 1. 检查token是否存在，不存在则先刷新
            if (!this.access_token) {
                const refreshSuccess = await this.refreshToken();
                if (!refreshSuccess) {
                    throw new Error('初始token获取失败，无法调用接口');
                }
            }
            // 2. 拼接请求配置（添加token头）
            const requestConfig = {
                ...config,
                headers: {
                    ...config.headers,
                    'Authorization': this.access_token // 统一添加token
                }
            };
            // 3. 执行请求
            const response = await axios(requestConfig);
            return response.data; // 只返回业务数据
        };

        try {
            // 第一次请求
            return await doRequest();
        } catch (error) {
            // 判定是否为token相关错误（401未授权/403禁止访问）
            const isTokenError = error.response?.status === 401 || error.response?.status === 403;

            // 非token错误直接抛出
            if (!isTokenError) {
                throw new Error(`调用接口失败[${config.url}]：${error.message}`);
            }

            // token过期/无效，尝试刷新token
            console.log(`token过期/无效，刷新token后重试接口：${config.url}`);
            const refreshSuccess = await this.refreshToken();

            // 刷新token失败
            if (!refreshSuccess) {
                throw new Error(`token过期且刷新失败，无法调用接口[${config.url}]`);
            }

            // 刷新token后重试请求
            try {
                return await doRequest();
            } catch (retryError) {
                throw new Error(`刷新token后重试接口[${config.url}]失败：${retryError.message}`);
            }
        }
    }

    /**
    * 刷新access_token
    * @returns {Promise<boolean>} 刷新成功返回true，失败返回false
    */
    async refreshToken() {
        try {
            const response = await axios.post(
                'https://test.ctgne.com/xeai/tool/jwt_access_token',
                {
                    "live_seconds": "30",
                    "private_key": "-----BEGIN PRIVATE KEY-----\\nMIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBANDnDjDK8DsHQwOqP5hn6+U0BaGWCIl9UsSrPlcTieuBGbJjN2RQqwWL+4oKPv7BVbkXigHtrZ4Jw91rggZKNQKPYfbKYPHDIHh2Nr3iLxjEGWs5wKGSsd6RoU4iCmid35rp9zpSxFVygP4yGTXpmXR0ujq2y4nIM/OxtnZLEl85AgMBAAECgYAobX6+jJefJNGgRPNXwEzTp5SrZ8ixKvK4otdGrL5VOD/L2Q2gOUhPo36DgWYdkTbQwjBwHRoraoJgOG0KYJQPWA25SvgxlcTWfnR0nLY8sWbBdjbgWfzblzBcEDfr52JDGolCravLpR4iXDTaXBXXy0t3aLIW5tzqYLJ2q2eWAQJBAPe+3InzMrLS5jwDIIoNxqeoLkXQaPKAFxPxiJa1GBIYFQtHM0kay1rOSDCtow2UCzH5EhqSfLoeAi2/eURa+XkCQQDX3OI+8gY8J8fPsGTTBDTe/d3DbZ22ZKcYCdmYkxjPeY+Af9e/MSxBr7GeXt2+xQuU65zUTjZk0ntiKLIF9uPBAkEAlg91Zdl5C/fSnOcH/pb5jPPBk2f5KWmMkPfr0909BzivBnXKCq3AHvBzqYiDCuZxIYPMA2xXQCSNDUi9Gzo/gQJAIWHYXzGggzcHsHev7+4rmvyZifputGE2cgI781t0L8m1xoJ+w+N/25ynFD3JfxIL63jQZQi/YrImQJTYixGWQQJBALtomVRFwo3cgR/e1Kcz2qYs1scRCNL8HZys8FjGB/FCNxsZMGC1FsWwckrVT0haZtyPRFnKOuX6lESZ8MYH8Ao=\\n-----END PRIVATE KEY-----",
                    "secret": "uzS4ric32zHegWpDldXFHe9AX1uowBTH"
                }
            );

            if (response?.data?.data?.access_token) {
                this.access_token = response.data.data.access_token;
                console.log('token刷新成功');
                return true;
            } else {
                console.error('token刷新接口返回格式异常', response?.data);
                return false;
            }
        } catch (e) {
            console.error('刷新token失败', e.message);
            return false;
        }
    }

}
