import constate from 'constate'
import {
  Column,
  Row,
  TableInstance,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable as useReactTable
} from 'react-table'

import { useEffect, useLayoutEffect } from 'react'

export type TSortBy = {
  id: string
  desc?: boolean
}

type TSelectionConfig = {
  selectedRowIds: (string | number) | (string | number)[]
  rowIdentityProp: string | number
}

type TPaginationConfig = {
  isEnabled: boolean
  manual?: boolean
  pageCount?: number
  pageSize?: number
  totalRows?: number
  onPageChange?: (page: number) => void
}

type TSortingConfig = {
  sortable: boolean
  manual?: boolean
  initialSortBy?: TSortBy[]
  onSortByChange?: (sortBy?: TSortBy[]) => void
}

function useSelectionHandle({ page }: TableInstance, selectionConfig?: TSelectionConfig) {
  const { selectedRowIds, rowIdentityProp } = selectionConfig || {}

  useLayoutEffect(() => {
    if (!selectionConfig) {
      return
    }

    if (!selectedRowIds || !rowIdentityProp) {
      throw new Error('selectedRowIds and rowIdentityProp should be defined')
    }

    page.forEach(({ toggleRowSelected, original }) => {
      const originalRowId = (original as any)[rowIdentityProp]
      toggleRowSelected(Array.isArray(selectedRowIds)
        ? selectedRowIds.includes(originalRowId)
        : selectedRowIds === originalRowId)
    })
  }, [selectedRowIds, page])
}

function useTablePageChanged({ state: { pageIndex } }: TableInstance, config?: TPaginationConfig) {
  useEffect(() => {
    config?.onPageChange?.(pageIndex + 1)
  }, [pageIndex])
}

function useTableSorting({ state: { sortBy } }: TableInstance, config?: TSortingConfig) {
  useEffect(() => config?.onSortByChange?.(sortBy), [sortBy])
}

function usePaginationTotalRows(dataLength: number, config?: TPaginationConfig) {
  if (config && config.manual && config.totalRows === undefined) {
    throw new Error('"totalRows" should be defined in manual mode')
  }

  return config?.totalRows || dataLength
}

function useTablePaginationAttributes(dataLength: number, config?: TPaginationConfig) {
  const isPaginationEnabled = !!config && config.isEnabled

  const paginationTableOptions = isPaginationEnabled
    ? (() => {
      if (config.manual && config.pageCount === undefined) {
        throw new Error('"pageSize" should be defined in manual mode')
      }

      return {
        manualPagination: true,
        pageCount: config.pageCount
      }
    })()
    : undefined

  return {
    paginationTableOptions,
    initialPaginationState: {
      pageSize: 9999999999,
      ...(isPaginationEnabled && {
        pageIndex: 0,
        pageSize: config.pageSize
      })
    },
    isPaginationEnabled,
    totalPaginationRows: usePaginationTotalRows(dataLength, config)
  }
}

function useTableSortingAttributes(config?: TSortingConfig) {
  const isSortingEnable = !!config && config.sortable

  const sortingTableOptions = isSortingEnable
    ? {
      manualSortBy: true
    }
    : undefined

  return {
    sortingTableOptions,
    initialSortingState: {
      sortBy: config?.initialSortBy || []
    },
    isSortingEnable
  }
}

export type TTableProviderProps = {
  columns: Column[]
  data: any[]
  paginationConfig?: TPaginationConfig
  selectionConfig?: TSelectionConfig
  sortingConfig?: TSortingConfig
  onRowClick?: (row: Row<any>) => void
  showRowBorder?: boolean
  hiddenColumns?: string[]
}

const useTable = ({
  columns,
  data,
  paginationConfig,
  selectionConfig,
  sortingConfig,
  onRowClick,
  showRowBorder,
  hiddenColumns
}: TTableProviderProps) => {
  const {
    initialPaginationState,
    isPaginationEnabled,
    paginationTableOptions,
    totalPaginationRows
  } = useTablePaginationAttributes(data.length, paginationConfig)

  const {
    sortingTableOptions,
    isSortingEnable,
    initialSortingState
  } = useTableSortingAttributes(sortingConfig)
  const tableInstance = useReactTable(
    {
      columns,
      data,
      disableSortBy: !isSortingEnable,
      autoResetSortBy: false,
      ...paginationTableOptions,
      ...sortingTableOptions,
      initialState: {
        ...initialSortingState,
        ...initialPaginationState,
        hiddenColumns: hiddenColumns || []
      }
    },
    useSortBy,
    usePagination,
    useRowSelect
  )
  useTableSorting(tableInstance, sortingConfig)
  useTablePageChanged(tableInstance, paginationConfig)
  useSelectionHandle(tableInstance, selectionConfig)

  return {
    tableInstance,
    onRowClick,
    isPaginationEnabled,
    totalPaginationRows,
    showRowBorder
  }
}

export const [TableProvider, useTableContext] = constate(useTable)
