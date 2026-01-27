export declare function openDB(name: string, storeKey: string, version?: number): Promise<IDBDatabase>;
export declare function putData(db: IDBDatabase, storeKey: string, key: string, value: unknown): Promise<void>;
export declare function getData(db: IDBDatabase, key: string): Promise<any>;
