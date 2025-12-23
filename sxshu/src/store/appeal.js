// src/store/useStore.js
import { create } from 'zustand';
// 创建全局store
const useStore = create((set) => ({
  appealTableTotal: 480,
  appealTableCurrent: 1,
  appealTableData: [
    {
      number: 1,
      province: '北京市',
      stationName: '北京朝阳场站',
      processNumber: 'PROC20250501001',
      appealType: '数据错误申诉',
      committer: '张三',
      desc: '场站入库数据与实际数量不符，差异为5件，申请复核',
      status: '已申请'
    },
    {
      number: 2,
      province: '上海市',
      stationName: '上海浦东场站',
      processNumber: 'PROC20250501002',
      appealType: '流程驳回申诉',
      committer: '李四',
      desc: '提交的流程被驳回，认为驳回理由不充分，申请重新审核',
      status: '已申请'
    },
    {
      number: 3,
      province: '广东省',
      stationName: '广州白云场站',
      processNumber: 'PROC20250501003',
      appealType: '权限变更申诉',
      committer: '王五',
      desc: '场站操作权限被无故降低，申请恢复原有权限',
      status: '已审核'
    },
    {
      number: 4,
      province: '江苏省',
      stationName: '南京江宁场站',
      processNumber: 'PROC20250501004',
      appealType: '数据错误申诉',
      committer: '赵六',
      desc: '出库数据记录缺失，需补充并修正数据',
      status: '待申请'
    },
    {
      number: 5,
      province: '浙江省',
      stationName: '杭州西湖场站',
      processNumber: 'PROC20250501005',
      appealType: '费用异议申诉',
      committer: '孙七',
      desc: '场站服务费用计算错误，申请核对并调整',
      status: '待审核'
    },
    {
      number: 6,
      province: '四川省',
      stationName: '成都武侯场站',
      processNumber: 'PROC20250501006',
      appealType: '流程驳回申诉',
      committer: '周八',
      desc: '流程提交后被驳回，希望提供具体的修改意见并重新审核',
      status: '已审核'
    },
    {
      number: 7,
      province: '湖北省',
      stationName: '武汉洪山场站',
      processNumber: 'PROC20250501007',
      appealType: '数据错误申诉',
      committer: '吴九',
      desc: '库存数据更新不及时，导致盘点结果异常，申请修正',
      status: '已审核'
    },
    {
      number: 8,
      province: '河南省',
      stationName: '郑州金水场站',
      processNumber: 'PROC20250501008',
      appealType: '权限变更申诉',
      committer: '郑十',
      desc: '新增的操作权限未生效，申请核实并处理',
      status: '已审核'
    },
    {
      number: 9,
      province: '山东省',
      stationName: '济南历下场站',
      processNumber: 'PROC20250501009',
      appealType: '费用异议申诉',
      committer: '钱十一',
      desc: '月度费用账单存在不明扣费项，申请解释并取消',
      status: '已审核'
    },
    {
      number: 10,
      province: '陕西省',
      stationName: '西安雁塔场站',
      processNumber: 'PROC20250501010',
      appealType: '流程驳回申诉',
      committer: '孙十二',
      desc: '流程审核超时，未收到任何反馈，申请重新处理',
      status: '已审核'
    },
    {
      number: 11,
      province: '天津市',
      stationName: '天津和平场站',
      processNumber: 'PROC20250501011',
      appealType: '数据错误申诉',
      committer: '李十三',
      desc: '货物运输数据录入错误，导致物流轨迹异常，申请修正',
      status: '已审核'
    },
    {
      number: 12,
      province: '重庆市',
      stationName: '重庆渝中场站',
      processNumber: 'PROC20250501012',
      appealType: '权限变更申诉',
      committer: '王十四',
      desc: '离职员工的权限未及时回收，申请处理并排查安全隐患',
      status: '已审核'
    },
    {
      number: 13,
      province: '福建省',
      stationName: '厦门思明场站',
      processNumber: 'PROC20250501013',
      appealType: '费用异议申诉',
      committer: '张十五',
      desc: '场站租赁费用上涨未提前通知，申请按原标准执行',
      status: '已审核'
    },
    {
      number: 14,
      province: '湖南省',
      stationName: '长沙岳麓场站',
      processNumber: 'PROC20250501014',
      appealType: '流程驳回申诉',
      committer: '刘十六',
      desc: '流程资料齐全但被驳回，申请明确驳回原因',
      status: '已审核'
    },
    {
      number: 15,
      province: '安徽省',
      stationName: '合肥庐阳场站',
      processNumber: 'PROC20250501015',
      appealType: '数据错误申诉',
      committer: '陈十七',
      desc: '客户信息数据同步失败，导致订单处理异常，申请修复',
      status: '已审核'
    },
    {
      number: 16,
      province: '辽宁省',
      stationName: '沈阳沈河场站',
      processNumber: 'PROC20250501016',
      appealType: '权限变更申诉',
      committer: '杨十八',
      desc: '申请的批量操作权限未通过，希望重新评估并批准',
      status: '已审核'
    },
    {
      number: 17,
      province: '云南省',
      stationName: '昆明五华场站',
      processNumber: 'PROC20250501017',
      appealType: '费用异议申诉',
      committer: '黄十九',
      desc: '物流配送费用计算有误，申请核对并退还多收金额',
      status: '已审核'
    },
    {
      number: 18,
      province: '广西壮族自治区',
      stationName: '南宁青秀场站',
      processNumber: 'PROC20250501018',
      appealType: '流程驳回申诉',
      committer: '周二十',
      desc: '流程修改后重新提交，申请优先审核',
      status: '已审核'
    },
    {
      number: 19,
      province: '河北省',
      stationName: '石家庄长安场站',
      processNumber: 'PROC20250501019',
      appealType: '数据错误申诉',
      committer: '吴二一',
      desc: '场站设备数据采集错误，导致维护计划异常，申请修正',
      status: '已发布'
    },
    {
      number: 20,
      province: '山西省',
      stationName: '太原小店场站',
      processNumber: 'PROC20250501020',
      appealType: '费用异议申诉',
      committer: '郑二二',
      desc: '增值服务费用未使用却被收取，申请退款',
      status: '审核中'
    }
  ],

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