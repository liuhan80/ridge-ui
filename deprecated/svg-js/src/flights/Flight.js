import './style.css'

const lightPointImg = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSIzNXB4IiB2aWV3Qm94PSIwIDAgNDAgMzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+RmlsbCAx5aSH5Lu9IDM8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPHJhZGlhbEdyYWRpZW50IGN4PSI3MS45MzU3MDkzJSIgY3k9IjUwJSIgZng9IjcxLjkzNTcwOTMlIiBmeT0iNTAlIiByPSIyMDIuMjgzMjklIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNzE5MzU3LDAuNTAwMDAwKSxzY2FsZSgwLjI4NTcxNCwxLjAwMDAwMCkscm90YXRlKC0xNzguOTU4NTc5KSxzY2FsZSgxLjAwMDAwMCwwLjY0NjY4MyksdHJhbnNsYXRlKC0wLjcxOTM1NywtMC41MDAwMDApIiBpZD0icmFkaWFsR3JhZGllbnQtMSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGRkZGRkYiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzZFQUZGQiIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9yYWRpYWxHcmFkaWVudD4KICAgICAgICA8cGF0aCBkPSJNMTE2OC40MTM3Miw3MTkuMTMxNjExIEMxMTY1LjY4NzIzLDcxOS45MTMwODggMTE2MS4yNTQxNyw3MTkuOTEzMDg4IDExNTguNTA5MDgsNzE5LjEzMTYxMSBDMTE1NS43Njk3MSw3MTguMzUxMTkyIDExNTUuNzU0NjksNzE3LjA4NDU5OSAxMTU4LjQ4MTksNzE2LjMwMjc2OSBDMTE2MS4yMDMzOSw3MTUuNTIyNzAyIDExNjUuNjM3MTYsNzE1LjUyMjcwMiAxMTY4LjM3NzI0LDcxNi4zMDI3NjkgQzExNzEuMTIxNjIsNzE3LjA4NDI0NiAxMTcxLjEzNTkyLDcxOC4zNTExOTIgMTE2OC40MTM3Miw3MTkuMTMxNjExIFoiIGlkPSJwYXRoLTIiPjwvcGF0aD4KICAgICAgICA8ZmlsdGVyIHg9Ii0xNTAuMCUiIHk9Ii01MjQuNCUiIHdpZHRoPSI0MDAuMCUiIGhlaWdodD0iMTE0OC44JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTMiPgogICAgICAgICAgICA8ZmVNb3JwaG9sb2d5IHJhZGl1cz0iMiIgb3BlcmF0b3I9ImRpbGF0ZSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd1NwcmVhZE91dGVyMSI+PC9mZU1vcnBob2xvZ3k+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjAiIGluPSJzaGFkb3dTcHJlYWRPdXRlcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI1IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVHYXVzc2lhbkJsdXI+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwLjQ1NTAzNzE1ICAgMCAwIDAgMCAxICAwIDAgMCAxIDAiIHR5cGU9Im1hdHJpeCIgaW49InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IueUu+advyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI0NTcuMDAwMDAwLCAtNDQ0LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i5Zyw5Zu+IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzEzLjAwMDAwMCwgLTI1Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJGaWxsLTHlpIfku70tMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE2My40NDU0OTIsIDcxNy43MTc3MTkpIHJvdGF0ZSgyNC4wMDAwMDApIHRyYW5zbGF0ZSgtMTE2My40NDU0OTIsIC03MTcuNzE3NzE5KSAiPgogICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci0zKSIgeGxpbms6aHJlZj0iI3BhdGgtMiI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJ1cmwoI3JhZGlhbEdyYWRpZW50LTEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTIiPjwvdXNlPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='

function pointsToPath (from, to, invertArc) {
  const curve = 0.03
  const fromX = from.x || from[0]
  const fromY = from.y || from[1]
  const toX = to.x || to[0]
  const toY = to.y || to[1]

  const arcPointX = (fromX + toX) / (invertArc ? 2 + curve : 2 - curve)
  const arcPointY = (fromY + toY) / (invertArc ? 2 + curve : 2 - curve)
  return [
    ['M', fromX, fromY],
    ['Q', arcPointX, arcPointY, toX, toY]
  ]
}

class Flight {
  constructor (props) {
    this.props = props
  }

  mount (el) {
    const { SVG } = window

    const draw = SVG().addTo('body').size(300, 300)
    const rect = draw.rect(100, 100).attr({ fill: '#f06' })

    const SVGELement = document.createElement('svg')

    el.appendChild(SVGELement)
    this.svg = SVG().addTo(el)
    this.svg.size('100%', '100%')
    this.update()
  }

  getPath (x, y, ex, ey, curvePointX, curvePointY) {
    let arcPointX = curvePointX
    let arcPointY = curvePointY
    if (!arcPointX) {
      arcPointX = (x + ex) / 2 - 40
    }
    if (!arcPointY) {
      arcPointY = (y + ey) / 2 - 40
    }
    // return `M${x} ${y}Q${cx} ${cy} ${ex} ${ey}`
    return `M${x} ${y} Q${arcPointX} ${arcPointY} ${ex} ${ey}`
  }

  // 电站与中心的连线
  addLine (from, to, curvePoint, active) {
    const { lineWidth = 1, activeLineWidth = 3 } = this.props
    const fromX = from.x || from[0]
    const fromY = from.y || from[1]
    const toX = to.x || to[0]
    const toY = to.y || to[1]

    const curvePointX = curvePoint ? (curvePoint.x ?? curvePoint[0]) : null
    const curvePointY = curvePoint ? (curvePoint.y ?? curvePoint[1]) : null

    let path = null

    path = this.getPath(fromX, fromY, toX, toY, curvePointX, curvePointY)

    this.svg.path(path).attr({
      fill: 'transparent',
      'stroke-width': active ? activeLineWidth : lineWidth,
      stroke: active ? this.gradActive : this.grad
    })

    if (active) {
      this.svg.image(lightPointImg).attr({
        width: 40,
        height: 35,
        style: `transform:rotate(-24deg);offset-path: path("${path}");animation: concentratedAnimation 2s linear infinite;animation-duration:4s; offset-distance: 0%;`
      }).dmove(-15, -16)
    }
  }

  update (props) {
    if (props) {
      this.props = props
    }
    this.svg.clear()

    const { commonLineStart = '#f2f047', commonLineEnd = '#1ed94f', commonLineActiveStart, commonLineActiveEnd, lineWidth = 1, activeLineWidth = 3, activeLine = 1 } = this.props
    this.grad = this.svg.gradient('linear', function (add) {
      add.stop(0, commonLineStart)
      add.stop(1, commonLineEnd)
    })
    this.gradActive = this.svg.gradient('linear', function (add) {
      add.stop(0, commonLineActiveStart)
      add.stop(1, commonLineActiveEnd)
    })

    const { lines } = this.props

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      this.addLine(line[0], line[1], line[2], activeLine === i)
    }
  }

  getChartMethod () {
    const { Highcharts } = window

    return Highcharts.mapChart
  }
}

export default Flight
