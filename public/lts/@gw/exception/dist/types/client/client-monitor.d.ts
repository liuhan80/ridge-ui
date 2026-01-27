import { IDataInfo } from '../memory/handler';
/**
 * 启动客户端监视功能
 *
 * @param title 监视任务名称
 * @param exceptionSnapshotKey 异常快照存储路径
 * @param exceptionLimit 异常快照存储数量上限，默认为100
 * @returns 返回一个对象，包含一个停止监视的方法
 */
export declare function startClientMonitor(title: string, exceptionLimit?: number): {
    exception: {
        start: () => string;
    };
    memory: {
        /**
         * 调试快照功能，用于调试内存数据

         * @param type 快照类型，'map'|'list'
         * @param tCode 埋点编号
         * @param interval 快照间隔时间
         * @param outputNumber 输出次数，默认为1次，0持续输出
         * @param limit 限制数量，类型为map时，限制合并深度，类型为list时，限制列表长度
         * @returns
         */
        debug: (type: "map" | "list", tCodeList: string[], interval?: number, outputNumber?: number, limit?: number) => string;
        mqtt: {
            status: IDataInfo;
            bypass: {
                close: () => string;
                open: (topicList?: string[]) => string;
                test: () => string;
                get: () => string;
            };
        };
        http: {
            bypass: {
                record: (urlList: string[]) => string;
                get: (url: string) => string;
            };
        };
        /**
         *
         * @param tCode 埋点编码
         * @returns map格式的数据，两级合并，多于两级覆盖
         */
        getMap: (tCode: string) => IDataInfo;
        getList: (tCode: string) => IDataInfo;
    };
};
export declare function stopClientMonitor(): void;
