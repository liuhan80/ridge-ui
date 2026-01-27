export declare function setHttpBypassSwitch(flag: boolean, keyList?: string[]): void;
export declare function getHttpBypassSwitch(key?: string): boolean;
export declare function keepHttpData(httpData: unknown[]): void;
export declare function sendHttpData(httpData: {
    url: string;
    topic: string;
    msg: unknown;
    handler: (topic: string, msg: unknown, cmd?: string) => void;
}[], limit?: number, interval?: number): Promise<{
    msg: string;
    error?: unknown;
}>;
export declare function checkHttpRequestBypass(tCode: string, config: {
    url: string;
    cmd?: string;
    baseURL?: string;
}): void;
