import { ICET, ICETRecord } from './cet';
import { Code, ID, Name } from './type/base-type';
/**异常 */
export interface Exception extends ICET {
    /** 异常简要描述 */
    readonly brief: Name;
    /** 异常编码 */
    readonly code: Code;
    /** JS引擎的错误对象 */
    readonly error: unknown;
    /** 异常发生时的上下文信息 */
    readonly context: {
        [key: Code]: string | number | boolean | null | undefined;
    };
    /**追踪链ID */
    readonly traceId: ID;
    /** 三方组件定义的异常信息，能够被捕获时记录 */
    readonly comStack?: unknown;
}
/**异常记录 */
export interface ExceptionRecord extends Exception, ICETRecord {
    /** 异常ID */
    readonly id: ID;
    /** 异常发生时间 */
    readonly time: number;
}
/**异常记录器接口 */
interface IERecorder {
    /**
     * 记录异常信息
     * @param er 异常信息
     */
    record(er: Exception): void;
    /**
     * 订阅异常信息
     * @param subscriberCode 订阅者Code
     * @param topic 主题，固定为'error'
     * @param handler 订阅者消费数据的处理逻辑
     */
    subscribe(subscriberCode: string, topic: 'error', handler: (data: ExceptionRecord) => void): void;
    /**
     * 退订异常信息
     * @param subscriberCode 订阅者Code
     * @param topic 主题，固定为'error'
     */
    unsubscribe(subscriberCode: string, topic: 'error'): void;
}
/**异常记录器 */
export declare const ERecorder: IERecorder;
export declare function outputException(): void;
export {};
