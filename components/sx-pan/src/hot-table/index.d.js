import HotTable from './HotTable.jsx'

// 1. 全国34个省级行政区列表（按常用顺序排列）
const provinces = ['天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆']

// 2. 生成10到100之间的随机整数（包含边界值）
const getRandomNum = () => {
  return Math.floor(Math.random() * 91) + 10 // Math.random()生成0-1的数，*91得到0-90.999，+10得到10-100.999，取整后是10-100
}

const randomScores = names => {
  return names.map((name, index) => {
    // 北京的各项值固定为100
    if (index === 0) {
      return {
        name,
        total: 100,
        status: 100,
        error: 100,
        line: 100,
        energy: 100
      }
    }
    // 其他省市随机生成10-100的数值
    return {
      name,
      total: getRandomNum(),
      status: getRandomNum(),
      error: getRandomNum(),
      line: getRandomNum(),
      energy: getRandomNum()
    }
  })
}

export default {
  name: 'HotTable',
  title: '热力表格',
  component: HotTable,
  icon: 'icons/BxTable.svg',
  type: 'react',
  props: [{
    name: 'colorStops',
    label: '渐变色',
    type: 'json',
    value: [
      { position: 0, color: '#11AB84' }, // CSS: 0%
      { position: 48, color: '#F6BD16' }, // CSS: 48%（原50%改为48%）
      { position: 100, color: '#FF6400' } // CSS: 100%
    ]
  }, {
    name: 'columns',
    label: '表头',
    type: 'json',
    value: [{
      dataIndex: 'name',
      align: 'left'
    },
    {
      title: '总得分',
      dataIndex: 'total'
    },
    {
      title: '电量',
      dataIndex: 'energy'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '故障',
      dataIndex: 'error'
    },
    {
      title: '一次接线图',
      dataIndex: 'line'
    }
    ]
  }, {
    name: 'dataSource',
    label: '表数据',
    type: 'json',
    value: randomScores(provinces)
  }],
  events: [],
  width: 540,
  height: 480
}
