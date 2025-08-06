'use client'

import StockSelector from '@/components/StockSelector'
import { Container, Stack } from '@mui/material'
import { useState } from 'react'

export default function Page() {
  const [stockId, setStockId] = useState<string>('')

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
        <StockSelector onStockChange={(id) => setStockId(id)} />
      </Container>

      {/* Content */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: '#EDEDED', flex: 1 }}
      ></Container>
    </Stack>
  )
}
