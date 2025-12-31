// src/store/useStatusBookStore.js
import { create } from 'zustand'

const fetchTableDataApi = async (url, params = { pageSize: 10, current: 1 }, signal) => {
  try {
    const queryString = new URLSearchParams(params).toString()
    const requestUrl = queryString ? `${url}?${queryString}` : url

    const response = await fetch(requestUrl, { signal })
    if (!response.ok) throw new Error(`请求失败：${response.status} ${response.statusText}`)

    const data = await response.json()
    const { items: list, count: total, pageSize, current } = data
    return { list, total, pageSize: pageSize || params.pageSize, current: current || params.current }
  } catch (error) {
    if (error.name !== 'AbortError') throw error
  }
}
class TableStoreFactory {
  constructor() {
    this.tableStores = {}
  }

  getTableStore(key) {
    if (!this.tableStores[key]) {
      this.tableStores[key] = create((set) => ({
        url: null,  // 新增url存储
        queryParams: {},  // 新增查询参数存储
        tableState: {
          list: [],
          total: 0,
          pageSize: 20,
          current: 1,
          loading: false,
          error: null,
          abortController: null
        },
        initTable: (pageSize = 10) => set((state) => ({
          tableState: { ...state.tableState, pageSize, current: 1, list: [], total: 0 }
        })),

        fetchTableData: (url, queryParams = {}) => set(async (state) => {

          // 保存当前请求的url和查询参数
          set({ url, queryParams })

          if (state.tableState.abortController) state.tableState.abortController.abort()
          const newAbortController = new AbortController()
          const current = state.tableState.current
          set({
            tableState: { ...state.tableState, loading: true, error: null, abortController: newAbortController }
          })

          try {
            // 核心：过滤queryParams，移除null/undefined，保留空字符串
            const filterQueryParams = (params) => {
              const filtered = {}
              Object.entries(params).forEach(([key, value]) => {
                // 只过滤 null 和 undefined，空字符串、0、false等都保留
                if (value !== null && value !== undefined) {
                  filtered[key] = value
                }
              })
              return filtered
            }

            // 先过滤参数，再组装请求参数
            const filteredQueryParams = filterQueryParams(queryParams)
            const requestParams = {
              pageSize: state.tableState.pageSize,
              current: state.tableState.current,
              ...filteredQueryParams
            }

            const data = await fetchTableDataApi(url, requestParams, newAbortController.signal)
            if (!data) return

            set({
              tableState: { ...state.tableState, ...data, loading: false, abortController: null, current }
            })
          } catch (error) {
            set({
              tableState: { ...state.tableState, loading: false, error: error.message, abortController: null }
            })
          }
        }),

        changeTablePage: (page) => set((state) => ({
          tableState: { ...state.tableState, current: page, error: null }
        })),

        changeTablePageSize: (pageSize) => set((state) => ({
          tableState: { ...state.tableState, pageSize, current: 1, error: null }
        })),

        refreshTable: () => set(async (state) => {
          // 从当前状态中获取之前的url和查询参数（需先在fetchTableData中保存这两个参数）
          // 注意：需要先在tableState中新增url和queryParams字段，并在fetchTableData时保存
          const { url, queryParams } = state;
          // 调用fetchTableData，传入之前保存的url和查询参数，复用分页信息（current、pageSize已在state中）
          await state.fetchTableData(url, queryParams);
          // 无需额外set，因为fetchTableData内部会处理状态更新
          return state;
        })
      }))
    }
    return this.tableStores[key]
  }
}

const tableStoreFactory = new TableStoreFactory()

export default tableStoreFactory
// export default useStatusBookStore
