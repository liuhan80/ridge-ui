import React from 'react'
import './style.css'
export default ({
  targetElement,
  renderContent,
  saveOnClick,
  captureChange,
  __composite,
  __isEdit
}) => {
  const ref = React.createRef()
  const config = {
  }

  const doCapture = () => {
    if (__isEdit) return

    let el = null
    if (targetElement) {
      const node = __composite.getNode(targetElement)
      if (node) {
        el = node.el
      }
    } else if (ref.current) {
      el = ref.current.closest('.ridge-composite')
    }
    if (!el) return

    html2canvas(el, {
      useCORS: true,
      backgroundColor: null,
      ignoreElements: element => element === ref.current
    }).then(canvas => {
      if (saveOnClick) {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'screenshot.png'
        link.click()
      } else {
        captureChange && captureChange(canvas.toDataURL('image/png'))
      }
    })
  }

  return (
    <>
      {renderContent && renderContent(config)}
      {!renderContent &&
        <div
          ref={ref}
          class='html2canvas' onClick={() => {
            doCapture()
          }}
        >
          <img
            src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMuMiIvPgogICAgPHBhdGggZD0iTTkgMkw3LjE3IDRINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yaC0zLjE3TDE1IDJIOXptMyAxNWMtMi43NiAwLTUtMi4yNC01LTVzMi4yNC01IDUtNSA1IDIuMjQgNSA1LTIuMjQgNS01IDV6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=' alt='Try html2canvas' class='css-1bgbwga'
          />
        </div>}
    </>
  )
}
