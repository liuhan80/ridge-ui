export declare function setMqttBypassSwitch(flag: boolean, topics?: string[]): void;
export declare function getMqttBypassSwitch(topic?: string): boolean;
export declare function sendMqttData(mqttData: {
    url: string;
    topic: string;
    msg: unknown;
    handler: (topic: string, msg: unknown, cmd?: string) => void;
}[], limit?: number, interval?: number): Promise<{
    msg: string;
    error?: unknown;
}>;
