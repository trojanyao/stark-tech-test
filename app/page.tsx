'use client'

import StockSelector from '@/components/StockSelector'
import { Container, Stack } from '@mui/material'
import { useState } from 'react'

import Title from './components/Title'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function Page() {
  const [selectedStock, setSelectedStock] = useState<IStock | null>(null)

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
          <Card>
            <CardContent></CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent></CardContent>
          </Card>
        </Stack>
      </Container>
    </Stack>
  )
}
