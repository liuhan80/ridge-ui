// src/store/useStore.js
import { create } from 'zustand';
// 创建全局store
const useStore = create((set) => ({
    statusBookTableData: [],
    statusBookTableToal: 250,
    statusBookTableCurrent: 1
}));

export default useStore;