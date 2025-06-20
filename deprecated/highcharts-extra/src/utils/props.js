const data = {
  label: '数据',
  name: 'data',
  type: 'json',
  value: [
    ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'],
    [43934, 48656, 65165, 81827, 112143, 142383,
      171533, 165174, 155157, 161454, 154610],
    [24916, 37941, 29742, 29851, 32490, 30282,
      38121, 36885, 33726, 34243, 31050]],
  connect: true
}
const timeInterval = {
  label: '时间间隔',
  name: 'timeInterval',
  type: 'number',
  value: 5 * 60 * 1000
}

const customize = {
  label: '其他属性',
  name: 'customize',
  type: 'json'
}

const colors = {
  label: '颜色',
  name: 'colorScheme',
  type: 'string',
  control: 'select',
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => ({
    label: '配色' + i,
    value: i - 1
  })),
  value: 0
}
const seriesNames = {
  label: '系列名称',
  name: 'seriesNames',
  item: '系列',
  type: 'array',
  value: []
}

const yFormat = {
  label: '格式',
  name: 'yFormat',
  type: 'string',
  value: '{value}'
}
export {
  colors,
  data,
  yFormat,
  timeInterval,
  customize,
  seriesNames
}
