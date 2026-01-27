import { Code, Name, ID } from './type/base-type';
/**
 * 邀约
 * @param T 标的物类型
 */
export interface Invitation<T> {
    /**订阅者Code */
    scode: Code;
    /**发布者Code */
    pcode: Code;
    /**标的物参数 subject matter parameter */
    smp: {
        code: Code;
        parameters?: {
            [p: string]: unknown;
        };
    };
    /**
     * 处理方法
     * @param data 数据
     * @returns 无
     */
    handler: (data: T, traceId: ID) => void;
    /**允许重复的订阅 */
    allow?: boolean;
    /**跟踪ID */
    traceid?: ID;
}
/**
 * 发布物
 * @param T 发布物类型
 */
export type Publication<T> = {
    /**发布者Code */
    pcode: Code;
    /**主题 */
    topic: Code;
    /**数据 */
    data: T;
    /**跟踪 */
    traceId: ID;
};
/**
 * 合约
 */
export type Contract = {
    /**会话ID */
    sid?: Code;
    /**发布者编码 */
    pcode?: Code;
    /**主题 */
    topic?: Code;
    /**订阅者编码 */
    scode?: Code;
};
/**
 * 合约管理器监视
 */
export interface ContractManagerMonitor {
    /**实例编码 */
    [instanceCode: string]: {
        [key: string]: number;
    };
}
/**
 * 合约管理器
 */
export declare class ContractManager<T = unknown> {
    /**
     * @param instanceCode 合约管理器实例Code
     * @param topicLimit 主题数量限制
     * @param publisherLimit 发布者数量限制
     * @param subscriberLimit 订阅者数量限制
     */
    constructor(instanceCode: Code, topicLimit: number, publisherLimit: number, subscriberLimit: number);
    instanceCode: Code;
    private topicLimit;
    private publisherLimit;
    private subscriberLimit;
    /**主题计数 */
    private topicCount;
    /**订阅者计数 */
    private subscriberCount;
    /**发布者计数 */
    private publisherCount;
    /**监视 */
    static Instances: ContractManagerMonitor;
    /**连接索引*/
    private connections;
    /**
     * 统计
     * @param c 统计项
     */
    private setCount;
    /**发布者索引 */
    private publishers;
    /**
     * 注册发布者
     * @param p 发布者
     * @returns 注册结果
     */
    registerPublisher(p: {
        pcode: Code;
        name: Name;
    }): boolean;
    /**
     * 根据发布者Code获取主题
     * @param p 发布者编码
     * @returns 主题索引
     */
    getTopics(p: Code): {
        [topic: string]: {
            c: number;
            ss: {
                [scode: Code]: {
                    e: number;
                    i: Invitation<T>;
                };
            };
        };
    };
    /**
     * 协商topic
     * @param p 邀约<交付物类型>
     * @returns 合约
     */
    consultTopic(p: Invitation<T>): string;
    /**
     * 订阅
     * @param p 邀约<交付物类型>
     * @returns 合约
     */
    subscribe(p: Invitation<T>): Contract | null;
    /**
     * 取消订阅
     *
     * @param p 要取消订阅的邀请对象
     */
    unsubscribe(i: Invitation<T>): void;
    /**
     * 发布
     * @param p 发布物<交付物类型>
     */
    publish(p: Publication<T>): false | undefined;
}
