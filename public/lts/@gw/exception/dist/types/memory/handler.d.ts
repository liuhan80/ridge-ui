export type IitemType = string | number | boolean | null | undefined | Date | IMonitorMap | (() => void);
export interface IMonitorMap {
    [key: string]: IitemType;
}
export interface IDataInfo {
    /** 编码 */
    readonly code: string;
    /**数据 */
    data: IMonitorMap | unknown[];
    /**记录过的数据总条数 */
    total: number;
    /** 开始记录的时间戳 */
    start: number;
    /** 结束记录的时间戳 */
    end?: number;
    /** 更新记录的时间戳 */
    utime?: number;
    /** 数据被消费后是否有更新，默认为false */
    uflag: boolean;
}
export interface ICustomMap {
    [storageKey: string]: IDataInfo;
}
export interface IOptions {
    /** 埋点编码 */
    tCodeList: string[];
    /** 时间间隔，单位为秒 */
    interval: number;
    /** 监控数据输出 */
    output: (data: IDataInfo) => Promise<void> | void;
    /** 是否保存数据到存储中，默认为false */
    save?: boolean;
    /** 输出次数，默认为1 */
    outputNumber?: number;
    /** 限制，默认为2 ，map类型限制合并深度，list类型限制数组长度*/
    limit?: number;
    /**做数据深度合并时，整备数据 */
    format?: (data: unknown) => unknown;
    /** 合并数据，默认为false */
    merge?: boolean;
}
/**
 * 设置Map处理器函数
 *
 * @param options 配置选项
 * @returns 返回设置后的处理器函数
 */
export declare function setMapHandler(options: IOptions): IDataInfo[];
/**
 * 设置列表处理函数
 *
 * @param options 选项参数
 * @returns 返回处理函数
 */
export declare function setListHandler(options: IOptions): IDataInfo[];
/**
 * 获取Map格式的埋点数据
 *
 * @param tCode 埋点编码
 * @returns 返回Map类型的埋点数据
 */
export declare function getMapData(tCode: string): IDataInfo;
export declare function getListData(tCode: string): IDataInfo;
export declare function resetListData(tCode: string): void;
