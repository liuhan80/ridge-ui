/**按数据单元的组成划分 */
/**
 * 唯一标识
 */
export type ID = string;
/**
 * 编码
 */
export type Code = string;
/**
 * 名称
 */
export type Name = string;
/**
 * 描述
 */
export type Description = string;
/**
 * 内容
 */
export type Content = any;
/**
 * 日期时间
 *
 */
export type DateTime = Date | string;
/**
 * 生产者
 */
export type Producer = ID | Code | Name;
/**
 * 内容格式
 */
/**
 * string、number、boolean
 */
/**
 * 超文本
 */
export type Hypertext = string;
/**
 * 文件
 */
export type FFile = 'Binary';
/**
 * 内容结构
 */
/**
 * 列表
 */
export type List<T> = T[];
/**
 * 索引
 */
export type FMap<T> = {
    [index: string]: T;
};
/**
 * 树节点数据
 */
export interface ITreeNode {
    /**节点ID */
    id: ID;
    /**节点名称 */
    name: Name;
    /**上级节点ID */
    pid?: ID;
}
/**
 * 业务对象
 *
 * @description 一个抽象的概念，可以对应DDD中的实体，或代码中的类，IA架构中数据的所有者
 */
export interface IBusinessObject {
    id: ID;
    code: Code;
    name: Name;
    type: Code;
}
/**
 * 时间日期范围
 */
export interface IDateTimeRange {
    begin?: DateTime;
    end?: DateTime;
}
/**
 * 数值范围
 */
export interface INumberRange {
    min: number;
    max: number;
}
/**
 * 坐标
 */
export interface ICoordinate {
    x: number;
    y: number;
    z?: number;
}
