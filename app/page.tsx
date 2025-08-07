'use client'

import StockSelector from '@/components/StockSelector'
import { Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

import Title from './components/Title'

import { Chart } from './components/Chart'
import ChartTimeRangeSelector from '../components/ChartTimeRangeSelector'
import DataTable from './components/DataTable'
import { useLoading } from '@/contexts/LoadingContext'

export default function Page() {
  const { setLoading } = useLoading()

  const [selectedStock, setSelectedStock] = useState<IStock | null>(null)

  const [{ start_date, end_date }, setTimeRange] = useState<{
    start_date: string
    end_date: string
  }>({ start_date: '', end_date: '' })

  const [revenueData, setRevenueData] = useState<IRevenue[]>([])

  /* Get selected stock data */
  useEffect(() => {
    async function getSelectedStockData() {
      if (!selectedStock?.stock_id) return

      setLoading(true)

      try {
        const params = new URLSearchParams({
          dataset: 'TaiwanStockMonthRevenue',
          data_id: selectedStock?.stock_id
        })

        if (start_date) {
          const date = new Date(start_date)
          // fetch data from one year ago to calculate year-on-year growth rate
          date.setFullYear(date.getFullYear() - 1)
          const extendedStart = date.toISOString().slice(0, 10)
          params.set('start_date', extendedStart)
        }
        if (end_date) params.set('end_date', end_date)

        const res = await fetch(`/api/finmind?${params.toString()}`)
        const result = await res.json()

        setLoading(false)

        const newData =
          result?.data?.map((item: IRevenue) => {
            // 1. convert revenue from NT$ to NT$1000
            item.revenue = item?.revenue / 1000

            // 2. Calculate monthly revenue year-on-year growth rate（单月营收年增率）
            const dateStr = item?.date
            const date = new Date(dateStr)
            date.setFullYear(date.getFullYear() - 1)
            const lastYearMonth = date.toISOString().slice(0, 10)
            const lastYearThisMonthRevenue = result?.data?.find(
              (x: IRevenue) => x.date === lastYearMonth
            )?.revenue
            const growthRate = lastYearThisMonthRevenue
              ? (item?.revenue / lastYearThisMonthRevenue - 1) * 100
              : null
            item.growth_rate = growthRate

            return item
          }) || []

        const visibleData = newData.filter(
          (item: IRevenue) => item?.date >= start_date && item?.date <= end_date
        )

        setRevenueData(visibleData)
      } catch (error) {
        throw new Error(`Error fetching stock data: ${error}`)
      }
    }

    getSelectedStockData()
  }, [selectedStock?.stock_id, start_date, end_date, setLoading])

  return (
    <Stack spacing={0} className="h-screen">
      {/* Header */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: 'white',
          py: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <StockSelector onStockChange={(stock) => setSelectedStock(stock)} />
      </Container>

      {/* Content */}
      <Container maxWidth={false} disableGutters sx={{ backgroundColor: '#EDEDED', flex: 1 }}>
        <Stack spacing={2} sx={{ width: '720px', py: 2, mx: 'auto', justifyContent: 'flex-start' }}>
          {/* Title */}
          <Title selectedStock={selectedStock} />

          {/* Chart */}
          <Chart dataset={revenueData}>
            <ChartTimeRangeSelector
              onChange={({ start_date, end_date }) => setTimeRange({ start_date, end_date })}
            />
          </Chart>

          {/* Table */}
          <DataTable rawData={revenueData} />
        </Stack>
      </Container>
    </Stack>
  )
}
