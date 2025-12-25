// src/store/useStore.js
import { create } from 'zustand';
// 创建全局store
const useStore = create((set) => ({
  appealTableTotal: 480,
  appealTableCurrent: 1,
  appealTableData: [],

  /**
   * 新增申诉表格
   */
  candinateModalVisible: false, // 申诉对话框可见性
  candinateDataTotal: 361,
  candinateDataCurrent: 1,
  candinateSelectedKeys: [],
  appealCandinateData: [
    // 第一组：电量分类（重复出现）
    { category: '电量', indicator: '上网电量', indicatorType: '完整性', score: 98.1 },
    { category: '电量', indicator: '发电量', indicatorType: '一致性', score: 81.1 },
    { category: '电量', indicator: '上网电量', indicatorType: '准确性', score: 92.3 },
    { category: '电量', indicator: '发电量', indicatorType: '完整性', score: 85.7 },
    { category: '电量', indicator: '厂用电率', indicatorType: '唯一性', score: 78.9 },
    { category: '电量', indicator: '上网电量', indicatorType: '有效性', score: 95.2 },
    { category: '电量', indicator: '发电量', indicatorType: '准确性', score: 88.4 },
    { category: '电量', indicator: '厂用电率', indicatorType: '一致性', score: 76.5 },
    { category: '电量', indicator: '上网电量', indicatorType: '唯一性', score: 90.6 },
    { category: '电量', indicator: '发电量', indicatorType: '有效性', score: 83.8 },
    // 第二组：电压分类（重复出现）
    { category: '电压', indicator: '母线电压', indicatorType: '完整性', score: 91.2 },
    { category: '电压', indicator: '线路电压', indicatorType: '一致性', score: 86.3 },
    { category: '电压', indicator: '母线电压', indicatorType: '准确性', score: 93.5 },
    { category: '电压', indicator: '线路电压', indicatorType: '完整性', score: 89.7 },
    { category: '电压', indicator: '变压器电压', indicatorType: '唯一性', score: 79.1 },
    { category: '电压', indicator: '母线电压', indicatorType: '有效性', score: 94.8 },
    { category: '电压', indicator: '线路电压', indicatorType: '准确性', score: 87.2 },
    { category: '电压', indicator: '变压器电压', indicatorType: '一致性', score: 77.4 },
    { category: '电压', indicator: '母线电压', indicatorType: '唯一性', score: 91.9 },
    { category: '电压', indicator: '线路电压', indicatorType: '有效性', score: 84.6 },
    // 第三组：电流分类（重复出现）
    { category: '电流', indicator: '负载电流', indicatorType: '完整性', score: 90.3 },
    { category: '电流', indicator: '零序电流', indicatorType: '一致性', score: 82.5 },
    { category: '电流', indicator: '负载电流', indicatorType: '准确性', score: 92.7 },
    { category: '电流', indicator: '零序电流', indicatorType: '完整性', score: 86.9 },
    { category: '电流', indicator: '短路电流', indicatorType: '唯一性', score: 80.2 },
    { category: '电流', indicator: '负载电流', indicatorType: '有效性', score: 93.1 },
    { category: '电流', indicator: '零序电流', indicatorType: '准确性', score: 85.4 },
    { category: '电流', indicator: '短路电流', indicatorType: '一致性', score: 78.3 },
    { category: '电流', indicator: '负载电流', indicatorType: '唯一性', score: 89.5 },
    { category: '电流', indicator: '零序电流', indicatorType: '有效性', score: 81.7 },
    // 第四组：功率分类（重复出现）
    { category: '功率', indicator: '有功功率', indicatorType: '完整性', score: 96.4 },
    { category: '功率', indicator: '无功功率', indicatorType: '一致性', score: 88.6 },
    { category: '功率', indicator: '有功功率', indicatorType: '准确性', score: 94.2 },
    { category: '功率', indicator: '无功功率', indicatorType: '完整性', score: 87.8 },
    { category: '功率', indicator: '视在功率', indicatorType: '唯一性', score: 81.4 },
    { category: '功率', indicator: '有功功率', indicatorType: '有效性', score: 97.3 },
    { category: '功率', indicator: '无功功率', indicatorType: '准确性', score: 89.1 },
    { category: '功率', indicator: '视在功率', indicatorType: '一致性', score: 79.6 },
    { category: '功率', indicator: '有功功率', indicatorType: '唯一性', score: 95.5 },
    { category: '功率', indicator: '无功功率', indicatorType: '有效性', score: 84.9 },
    // 第五组：回到电量分类（继续重复）
    { category: '电量', indicator: '上网电量', indicatorType: '完整性', score: 92.8 },
    { category: '电量', indicator: '发电量', indicatorType: '一致性', score: 83.2 },
    { category: '电量', indicator: '厂用电率', indicatorType: '准确性', score: 77.9 },
    { category: '电量', indicator: '上网电量', indicatorType: '唯一性', score: 91.4 },
    { category: '电量', indicator: '发电量', indicatorType: '有效性', score: 86.5 },
    { category: '电压', indicator: '母线电压', indicatorType: '完整性', score: 93.7 },
    { category: '电压', indicator: '线路电压', indicatorType: '一致性', score: 85.1 },
    { category: '电流', indicator: '负载电流', indicatorType: '准确性', score: 90.8 },
    { category: '功率', indicator: '有功功率', indicatorType: '完整性', score: 96.7 },
    { category: '电量', indicator: '上网电量', indicatorType: '有效性', score: 94.3 }
  ].map((item, index) => ({
    ...item,
    key: `item_${index + 1}` // 生成格式：item_1、item_2...（也可以直接用index + 1作为key）
  })),
  candinateGotoPage: page => set(state => {
    return {
      candinateDataCurrent: page
    }
  }),
  setCandinateModalVisible: visible => set(state => {
    return {
      candinateModalVisible: visible
    }
  }),
  
  setCandinateSelectedKeys: keys => set(state => {
    return {
      candinateSelectedKeys: keys
    }
  }),

  // 确认场站申诉选择
  confirmStationCreate: () => set(state => {
    return {
      candinateModalVisible: false,
      confirmAppealModalVisible: true,
      appealStationSelectedData: state.candinateSelectedKeys.map(key => {
        return state.appealCandinateData.find(t => t.key === key)
      })
    }
  }),


  /**
   * 申诉确认对话框相关状态
   */
  confirmAppealModalVisible: false,
  appealStationSelectedData: [], // 申诉已选

  goBackCreateAppealModal: () => set(state => { // 回退到选择表格
    return {
      candinateModalVisible: true,
      confirmAppealModalVisible: false,
      candinateSelectedKeys: state.appealStationSelectedData.map(data => data.key)
    }
  }),

  removeStationSelectedData: key => set(state => { // 删除一条申请项
    return {
      appealStationSelectedData: state.appealStationSelectedData.filter(data => data.key !== key)
    }
  }),
  
  setConfirmAppealModalVisible: visible => set(state => {
    return {
      confirmAppealModalVisible: visible
    }
  }),

  cancelAppealRequest: () => set(state => { // 回退到选择表格
    return {
      candinateModalVisible: false,
      confirmAppealModalVisible: false,
      candinateSelectedKeys: [],
      appealStationSelectedData: []
    }
  })

}));

export default useStore;