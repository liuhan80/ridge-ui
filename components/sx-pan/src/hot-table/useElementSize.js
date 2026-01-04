// src/hooks/useElementSize.js
import { useState, useRef, useEffect } from 'react'

/**
 * 监听元素尺寸变化的自定义Hook
 * @returns {[object, React.RefObject, function]} [尺寸对象, 元素ref, 手动更新尺寸方法]
 * - size: { width: number, height: number } 实时宽高
 * - ref: 需绑定到目标元素的ref
 * - updateSize: 手动触发更新尺寸的方法（可选）
 */
const useElementSize = () => {
  // 存储元素实时尺寸
  const [size, setSize] = useState({
    width: 0,
    height: 0
  })
  // 绑定目标元素的ref
  const ref = useRef(null)
  // 存储ResizeObserver实例，避免重复创建
  const resizeObserverRef = useRef(null)

  // 核心：更新尺寸的方法
  const updateSize = () => {
    const container = ref.current
    if (container) {
      // 可选：clientWidth/clientHeight | offsetWidth/offsetHeight | scrollWidth/scrollHeight
      const { clientWidth, clientHeight } = container
      setSize({
        width: clientWidth,
        height: clientHeight
      })
    }
  }

  // 监听元素尺寸变化
  useEffect(() => {
    const container = ref.current
    if (!container) return

    // 初始化获取一次尺寸
    updateSize()

    // 创建ResizeObserver并监听
    resizeObserverRef.current = new ResizeObserver(updateSize)
    resizeObserverRef.current.observe(container)

    // 清理副作用：停止监听、销毁实例
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(container)
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }
    }
  }, [])

  // 返回：尺寸对象、元素ref、手动更新方法（按需使用）
  return [size, ref, updateSize]
}

export default useElementSize
