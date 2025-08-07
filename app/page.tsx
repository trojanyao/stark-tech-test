'use client'

import StockSelector from '@/components/StockSelector'
import { Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

import Title from './components/Title'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Chart } from './components/Chart'

export default function Page() {
  const [selectedStock, setSelectedStock] = useState<IStock | null>(null)
  const [revenueData, setRevenueData] = useState<IRevenue[]>([])

  /* Get selected stock data */
  useEffect(() => {
    async function getSelectedStockData() {
      if (!selectedStock?.stock_id) return

      try {
        const res = await fetch(
          `/api/finmind?dataset=TaiwanStockMonthRevenue&data_id=${selectedStock?.stock_id}&start_date=2018-01-01&end_date=2023-12-31` // Adjust the date range as needed
        )
        const result = await res.json()

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

        setRevenueData(newData)
      } catch (error) {
        throw new Error(`Error fetching stock data: ${error}`)
      }
    }

    getSelectedStockData()
  }, [selectedStock?.stock_id])

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
          <Chart dataset={revenueData} />

          {/* Table */}
          <Card>
            <CardContent></CardContent>
          </Card>
        </Stack>
      </Container>
    </Stack>
  )
}
