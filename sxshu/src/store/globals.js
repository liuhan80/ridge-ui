// src/store/useStore.js
import { create } from 'zustand';
import { provincesList } from './mock';
// 创建全局store
const useStore = create((set) => ({

  provinces: provincesList,

  // 初始化状态
  dateTypes: [{
    label: '电量',
    value: 'energy'
  }, {
    label: '状态',
    value: 'status',
  }, {
    label: '故障',
    value: 'error',
  }, {
    label: '一次接线图',
    value: 'line'
  }],

  anaType: [{
    label: '完整性',
    value: 'integrity'
  }, {
    label: '有效性',
    value: 'validity '
  }, {
    label: '准确性',
    value: 'correctness'
  }, {
    label: '一致性',
    value: 'same'
  }],
}));

export default useStore;