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
  constructor () {
    this.tableStores = {}
  }

  getTableStore (key) {
    if (!this.tableStores[key]) {
      this.tableStores[key] = create((set) => ({
        tableState: {
          list: [],
          total: 0,
          pageSize: 10,
          current: 1,
          loading: false,
          error: null,
          abortController: null
        },
        initTable: (pageSize = 10) => set((state) => ({
          tableState: { ...state.tableState, pageSize, current: 1, list: [], total: 0 }
        })),

        fetchTableData: (url, queryParams = {}) => set(async (state) => {
          if (state.tableState.abortController) state.tableState.abortController.abort()
          const newAbortController = new AbortController()
          const current = state.tableState.current
          set({
            tableState: { ...state.tableState, loading: true, error: null, abortController: newAbortController }
          })

          try {
            const requestParams = {
              pageSize: state.tableState.pageSize,
              current: state.tableState.current,
              ...queryParams
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

        refreshTable: () => set((state) => ({
          tableState: { ...state.tableState, error: null }
        }))
      }))
    }
    return this.tableStores[key]
  }
}

const tableStoreFactory = new TableStoreFactory()

export default tableStoreFactory
// export default useStatusBookStore
