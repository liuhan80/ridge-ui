// src/hooks/useTableScrollHeight.js
import { useState, useEffect } from 'react';

/**
 * 自定义Hook：计算表格的scrollY高度
 * @param {string} containerClassName - 表格容器的类名（用于获取DOM元素）
 * @param {number} offset - 高度偏移值（容器高度减去该值，得到表格的scrollY）
 * @returns {number} - 表格的scrollY高度
 */
const useTableScrollHeight = (containerClassName, offset = 0) => {
  const [tableScrollY, setTableScrollY] = useState(0);

  // 定义计算高度的函数
  const calculateTableHeight = () => {
    // 根据类名获取容器元素（注意：类名不要拼错，原代码中有笔误reivew→review，这里保留和原代码一致的类名）
    const container = document.querySelector(`.${containerClassName}`);
    if (container) {
      const containerHeight = container.clientHeight;
      // 计算并设置表格的scrollY高度
      setTableScrollY(Math.max(0, containerHeight - offset));
    }
  };

  // 组件挂载时计算高度，监听窗口resize事件
  useEffect(() => {
    calculateTableHeight();
    window.addEventListener('resize', calculateTableHeight);

    // 组件卸载时移除事件监听，避免内存泄漏
    return () => {
      window.removeEventListener('resize', calculateTableHeight);
    };
  }, [containerClassName, offset]); // 依赖：类名和偏移值变化时重新执行

  return tableScrollY;
};

export default useTableScrollHeight;