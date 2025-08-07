'use client'

import SectionTitle from '@/components/SectionTitle'
import { useLoading } from '@/contexts/LoadingContext'
import { Box, Card, CardContent, Stack } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  gridVisibleColumnDefinitionsSelector,
  useGridApiRef
} from '@mui/x-data-grid'
import { useEffect } from 'react'

export default function DataTable({ rawData }: { rawData: IRevenue[] }) {
  const apiRef = useGridApiRef()
  const { loading } = useLoading()

  const dates = rawData.map((item: IRevenue) => {
    const date = new Date(item.date)
    return date.toISOString().slice(0, 7)
  })

  const revenueRow = rawData.reduce(
    (acc, item) => {
      const key = new Date(item.date).toISOString().slice(0, 7)
      acc[key] = item.revenue.toLocaleString('zh-TW')
      return acc
    },
    { id: 'revenue', label: '月营收（元）' } as Record<string, unknown>
  )
  const rateRow = rawData.reduce(
    (acc, item) => {
      const key = new Date(item.date).toISOString().slice(0, 7)
      acc[key] = item.growth_rate != null ? `${item.growth_rate.toFixed(2)}%` : '—'
      return acc
    },
    { id: 'rate', label: '單月營收年增率 (%)' } as Record<string, unknown>
  )

  const rows = rawData?.length ? [revenueRow, rateRow] : []

  const dynamicCols: GridColDef[] = dates.map((date) => ({
    field: date,
    headerName: date,
    width: 140,
    align: 'center',
    headerAlign: 'center'
  }))

  const columns: GridColDef[] = [
    {
      field: 'label',
      headerName: '年度月份',
      width: 150,
      align: 'center',
      headerAlign: 'center'
    },
    ...dynamicCols
  ]

  /* Scroll to the right automatically */
  useEffect(() => {
    const maxColIndex = gridVisibleColumnDefinitionsSelector(apiRef).length - 1

    if (apiRef.current && maxColIndex >= 0) {
      setTimeout(() => {
        if (apiRef.current) {
          apiRef.current.scrollToIndexes({ rowIndex: 0, colIndex: maxColIndex })
        }
      }, 1000)
    }
  }, [apiRef, rawData?.length])

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* Title */}
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <SectionTitle title="詳細數據" />
          </Stack>

          {/* Table */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DataGrid
              apiRef={apiRef}
              rows={rows}
              columns={columns}
              loading={loading}
              // pinnedColumns={{ left: ['label'] }} // Only available for Pro
              disableColumnSorting
              disableColumnMenu
              disableRowSelectionOnClick
              hideFooter
              hideFooterPagination
              slots={{
                noRowsOverlay: !loading ? CustomNoRowsOverlay : () => null
              }}
              slotProps={{
                cell: { onClick: (e) => e.stopPropagation() }
              }}
            />
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

function CustomNoRowsOverlay() {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: 16,
        color: '#999'
      }}
    >
      暂无数据
    </Box>
  )
}
