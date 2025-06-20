import Flight from './Flight.js'
export default {
  name: 'Flight',
  title: '飞行图',
  component: Flight,
  icon: 'bi bi-pie-chart',
  type: 'vanilla',
  props: [
    {
      label: '连接线',
      name: 'lines',
      connect: true,
      type: 'json',
      value: [
        [
          [
            30,
            140
          ],
          [
            250,
            240
          ]
        ],
        [
          [
            520,
            30
          ],
          [
            250,
            240
          ]
        ],
        [
          [
            520,
            230
          ],
          [
            250,
            240
          ]
        ]
      ]
    }, {
      label: '开始色',
      type: 'color',
      name: 'commonLineStart',
      value: '#F5A623'
    }, {
      label: '结束色',
      type: 'color',
      value: '#F8E71C',
      name: 'commonLineEnd'
    }, {
      label: '活动开始色',
      type: 'color',
      name: 'commonLineActiveStart',
      value: '#4A90E2'
    }, {
      label: '结束色',
      type: 'color',
      name: 'commonLineActiveEnd'
    }, {
      label: '当前活动线',
      type: 'number',
      connect: true,
      name: 'activeLine'
    }, {
      label: '线宽',
      type: 'number',
      name: 'lineWidth',
      value: 3
    }, {
      label: '活动线宽',
      type: 'number',
      name: 'activeLineWidth',
      value: 5
    }
  ],
  width: 560,
  height: 360
}
