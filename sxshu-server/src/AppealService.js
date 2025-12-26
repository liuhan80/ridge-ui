const { BadRequestError, NotFoundError, ConflictError } = require('ridge-http');

/*
* @author 刘晗
* @Date: 2021-05-12 17:00:48
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
    }
}
