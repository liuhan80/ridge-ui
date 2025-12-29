// src/store/useStore.js
import { create } from 'zustand';
import { provincesList } from './mock';
import { fetchData, getNodeRequestUrl } from '../utils/utils';
// 创建全局store
const useStore = create((set) => ({
  provinces: provincesList,
  userProvinces: null, // 用户有权限的省
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

    // 3. 定义异步初始化方法，用于从接口加载数据并更新状态
  initResources: async () => {
    const resData = await fetchData(getNodeRequestUrl('/permision/resources'));
    if (resData) {
      console.log('用户有权限的省', resData.result)
        set({
          // 假设接口返回的数据结构如下，根据实际接口返回字段调整
          userProvinces: resData.result
        });
      } else {
        console.log('获取用户权限失败')
      }
    }
}));


if (typeof window !== 'undefined') {
  useStore.getState().initResources();
}
export default useStore;

// /permision/resources