const AppealService = require('./AppealService.js');
const FileManager = require('./FileManager.js');
const TableService = require('./TableService.js');
const PermissionService = require('./PermissionService.js');
const JSONStorageService = require('./JSONStorageService.js')
module.exports = {
    name: 'sx-shu-service',
    description: '三峡数据盘点前端服务',

    // 模块初始化动作，对于核心模块可以进行koa相关插件注册
    // 业务模块可以进行服务创建
    async created(app) {
        /**
         * 解析用户名校验头的中间件
         * 兼容 iv-user (WebSEAL) 和 X-Credential-Username 两个请求头
         */
        const parseUserHeader = async (ctx, next) => {
            try {
                // 1. 优先读取 iv-user 请求头（兼容 WebSEAL）
                let username = ctx.request.headers['iv-user'];

                // 2. 如果 iv-user 不存在，读取 X-Credential-Username
                if (!username) {
                    username = ctx.request.headers['x-credential-username'];
                }

                // 3. 统一处理：去除首尾空格，空值转为 null
                ctx.state.username = username ? username.trim() : null;

                // 4. 继续执行后续中间件
                await next();
            } catch (error) {
                console.error('解析用户请求头失败：', error);
                ctx.state.username = null;
                await next();
            }
        };
        // 注册中间件
        app.use(parseUserHeader);

    },

    // 模块路由注册，对外提供API可在此写api相关地址
    async ready(app) {
        app.services.appealService = new AppealService(app);
        app.services.appealService.initRoutes(app);

        app.services.fileManager = new FileManager(app);
        app.services.fileManager.initRoutes(app);
        app.services.sxTables = new TableService(app, 'sxshu');
        app.services.permissionService = new PermissionService(app);
        app.services.jsonStorage = new JSONStorageService(app);
    },

    // 启动收尾工作，可以在此执行建库、建索引等一些全局的具体业务操作
    async bootComplete(app) { },

    shutdown() { }
};
