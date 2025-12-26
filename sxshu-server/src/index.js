const AppealService = require('./AppealService.js');
const FileManager = require('./FileManager.js');
const TableService = require('./TableService.js');
module.exports = {
    name: 'sx-shu-service',
    description: '三峡数据盘点前端服务',

    // 模块初始化动作，对于核心模块可以进行koa相关插件注册
    // 业务模块可以进行服务创建
    async created(app) {},

    // 模块路由注册，对外提供API可在此写api相关地址
    async ready(app) {
        app.services.appealService = new AppealService(app);
        app.services.appealService.initRoutes(app);

        app.services.fileManager = new FileManager(app);
        app.services.fileManager.initRoutes(app);

        app.services.sxTables = new TableService(app, 'sxshu');
        
    },

    // 启动收尾工作，可以在此执行建库、建索引等一些全局的具体业务操作
    async bootComplete(app) {},

    shutdown() {}
};
