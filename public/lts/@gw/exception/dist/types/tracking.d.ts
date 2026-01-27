import { ICET } from './cet';
/**埋点信息 */
export interface ITracking extends ICET {
    data: unknown;
    traceId: string;
}
/**埋点信息记录 */
export interface ITRecord extends ITracking {
    /** 埋点信息产生时间 */
    time: number;
}
/**埋点信息记录器接口 */
interface IDERecorder {
    /**
     * 记录埋点信息
     * @param d 埋点信息
     */
    record(d: ITracking): void;
    /**
     * 订阅埋点信息
     * @param subscriberCode 订阅者Code
     * @param topic 主题，固定为'debug'
     * @param handler 订阅者消费数据的处理逻辑
     */
    subscribe(subscriberCode: string, topic: 'debug', handler: (data: ITRecord) => void): void;
    /**
     * 退订埋点信息
     * @param subscriberCode 订阅者Code
     * @param topic 主题，固定为'debug'
     */
    unsubscribe(subscriberCode: string, topic: 'debug'): void;
}
export declare const TRecorder: IDERecorder;
export declare function tR(t: ITracking): void;
export {};
