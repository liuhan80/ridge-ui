import React, { useEffect, useMemo, useCallback } from 'react';
import { Table, Spin, Alert, Pagination } from 'antd';

/**
 * 通用表格组件（封装所有表格的通用逻辑）
 * @param {Object} props - 组件属性
 * @param {string} props.tableKey - 表格唯一标识（如statusBook、faultBook）
 * @param {string} props.url - 数据请求地址
 * @param {Array} props.columns - 表格表头配置（支持自定义操作列）
 * @param {Object} props.store - 对应的Zustand Store实例（如useStatusBookStore）
 * @param {Object} [props.queryParams] - 额外的查询条件（如筛选条件）
 * @param {number} [props.initialPageSize=10] - 初始每页条数
 * @param {Object} [props.paginationProps] - 分页组件的额外配置
 * @param {Object} [props.tableProps] - Table组件的额外配置（如scroll、rowKey）
 */
const CommonTable = ({
  tableKey,
  url,
  columns,
  store,
  queryParams = {},
  initialPageSize = 10,
  paginationProps = {},
  tableProps = {},
}) => {
  // 从Store中获取状态和方法
  const {
    tableStates,
    fetchTableData,
    initTable,
  } = store();

  // 初始化表格状态（组件挂载时执行一次）
  useEffect(() => {
    initTable(tableKey, { pageSize: initialPageSize });
  }, [initTable, tableKey, initialPageSize]);

  // 获取当前表格的状态（默认初始状态）
  const tableState = useMemo(() => {
    return tableStates[tableKey] || {
      list: [],
      total: 0,
      pageSize: initialPageSize,
      current: 1,
      loading: false,
      error: null,
    };
  }, [tableStates, tableKey, initialPageSize]);

  const { list, total, pageSize, current, loading, error } = tableState;

  // 合并请求参数（分页参数 + 自定义查询参数）
  const requestParams = useMemo(() => {
    return {
      pageSize,
      current,
      ...queryParams,
    };
  }, [pageSize, current, queryParams]);

  // 加载数据（分页/查询参数变化时触发）
  useEffect(() => {
    if (tableStates[tableKey]) { // 确保表格状态已初始化
      fetchTableData(tableKey, url, requestParams);
    }
  }, [fetchTableData, tableKey, url, requestParams, tableStates]);

  // 处理分页变化
  const handlePageChange = useCallback((newPage, newPageSize) => {
    fetchTableData(tableKey, url, {
      ...requestParams,
      current: newPage,
      pageSize: newPageSize,
    });
  }, [fetchTableData, tableKey, url, requestParams]);

  // 渲染加载状态
  if (loading) {
    return <Spin tip="正在加载数据..." style={{ margin: '50px auto', display: 'block' }} />;
  }

  // 渲染错误状态
  if (error) {
    return <Alert message="加载失败" description={error} type="error" showIcon />;
  }

  // 合并Table组件的默认配置和自定义配置
  const finalTableProps = {
    columns,
    dataSource: list,
    rowKey: 'key', // 默认rowKey为key，可通过tableProps覆盖
    pagination: false, // 关闭内置分页，使用外部分页
    ...tableProps,
  };

  // 合并分页组件的默认配置和自定义配置
  const finalPaginationProps = {
    current,
    pageSize,
    total,
    onChange: handlePageChange,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条数据`,
    ...paginationProps,
  };

  return (
    <div style={{ padding: '20px' }}>
      <Table {...finalTableProps} />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Pagination {...finalPaginationProps} />
      </div>
    </div>
  );
};

export default CommonTable;