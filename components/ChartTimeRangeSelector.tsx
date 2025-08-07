'use client'

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'

export type TimeRangeOption = '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL'

const TIME_RANGE_LABELS: Record<TimeRangeOption, string> = {
  '3M': '近3個月',
  '6M': '近6個月',
  '1Y': '近1年',
  '3Y': '近3年',
  '5Y': '近5年',
  ALL: '全部'
}

export default function ChartTimeRangeSelector({
  onChange
}: {
  onChange: (value: { start_date: string; end_date: string }) => void
}) {
  const [value, setValue] = useState<TimeRangeOption>('3M')

  useEffect(() => {
    const { start_date, end_date } = getDateRangeFromOption(value)
    onChange({ start_date, end_date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event: SelectChangeEvent<TimeRangeOption>) => {
    const value = event.target.value as TimeRangeOption
    setValue(value)

    const { start_date, end_date } = getDateRangeFromOption(value)
    onChange({ start_date, end_date })
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="time-range-label">時間區間</InputLabel>

      <Select labelId="time-range-label" value={value} label="時間區間" onChange={handleChange}>
        {(Object.keys(TIME_RANGE_LABELS) as TimeRangeOption[]).map((range) => (
          <MenuItem key={range} value={range}>
            {TIME_RANGE_LABELS[range]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

function getDateRangeFromOption(option: TimeRangeOption): {
  start_date: string
  end_date: string
} {
  const today = new Date()
  const end_date = today.toISOString().split('T')[0] // yyyy-mm-dd

  if (option === 'ALL') {
    return {
      start_date: '2002-02-01',
      end_date
    }
  }

  const start = new Date(today)

  switch (option) {
    case '3M':
      start.setMonth(start.getMonth() - 3)
      break
    case '6M':
      start.setMonth(start.getMonth() - 6)
      break
    case '1Y':
      start.setFullYear(start.getFullYear() - 1)
      break
    case '3Y':
      start.setFullYear(start.getFullYear() - 3)
      break
    case '5Y':
      start.setFullYear(start.getFullYear() - 5)
      break
  }

  const start_date = start.toISOString().split('T')[0]

  return {
    start_date,
    end_date
  }
}
