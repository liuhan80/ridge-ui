import { IDataInfo } from '../memory/handler';
export interface ITopicStatusMap {
    [topic: string]: {
        status: string;
        options: unknown;
        error?: unknown;
        counter?: {
            dc: number;
            suber: {
                ok: number;
                ex: number;
                discard: number;
                error?: unknown;
            };
        };
    };
}
export interface IMqttStatus {
    [url: string]: {
        options: unknown;
        status: string;
        topics?: ITopicStatusMap;
    };
}
export declare const mqttMonitor: {
    status: IDataInfo;
    bypass: {
        close: () => string;
        open: (topicList?: string[]) => string;
        test: () => string;
        get: () => string;
    };
};
