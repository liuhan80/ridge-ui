/**
 * 埋点
 */
export interface ICET {
    readonly code: string;
}
/**
 * 埋点记录
 */
export interface ICETRecord extends ICET {
    readonly id: string;
    readonly time: number;
}
