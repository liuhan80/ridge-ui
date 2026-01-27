/**
 * 启动服务监控
 *
 * @param title 服务名称
 * @param snapshotFilePath 快照文件路径
 */
export declare function startServiceMonitor(title: string, snapshotFilePath: string): void;
/**
 * 停止服务监控
 *
 * 该函数用于停止当前运行的服务监控，包括停止定时器、取消订阅错误事件、清空监控对象等。
 *
 * @returns 无返回值
 */
export declare function stopServiceMonitor(): void;
