'use client'

import { Autocomplete, autocompleteClasses, Popper, styled, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { ListboxComponent } from './VirtualizedListbox'

import { SearchOutlined } from '@mui/icons-material'

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0
    }
  }
})

export default function StockSelector({
  onStockChange
}: {
  onStockChange?: (stockId: string) => void
}) {
  const [stocks, setStocks] = useState<IStock[]>([])
  // const [selectedStock, setSelectedStock] = useState<IStock | null>(null)

  /* Get and set stock list */
  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await fetch('/api/finmind?dataset=TaiwanStockInfo')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()

        setStocks(result?.data || [])
        // setSelectedStock(result?.data?.[0])
        // onStockChange?.(result?.data?.[0]?.stock_id)
      } catch (error) {
        console.error('Error fetching stocks:', error)
      }
    }

    fetchStocks()
  }, [onStockChange])

  return (
    <Autocomplete
      sx={{
        width: 400
        // '& .MuiInputBase-root': {
        //   height: 40
        // },
        // '& input': {
        //   paddingTop: 0,
        //   paddingBottom: 0,
        //   height: '100%',
        //   boxSizing: 'border-box'
        // }
      }}
      // value={selectedStock}
      options={stocks}
      getOptionLabel={(option) => `${option?.stock_name} (${option?.stock_id})`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="輸入台／美股代號，查看公司價值"
          // slotProps={{
          //   inputLabel: {
          //     sx: {
          //       top: '50%',
          //       left: 12,
          //       transform: 'translate(0, -50%) scale(1)',
          //       transformOrigin: 'left'
          //     }
          //   }
          // }}
        />
      )}
      renderOption={(props, option, state) => [props, option, state.index] as React.ReactNode}
      popupIcon={<SearchOutlined />}
      slots={{
        popper: StyledPopper
      }}
      slotProps={{
        popupIndicator: {
          sx: {
            transform: 'none !important'
          }
        },
        listbox: {
          component: ListboxComponent
        }
      }}
      onChange={(_, value) => onStockChange?.(value?.stock_id || '')}
    />
  )
}
