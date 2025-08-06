import SectionTitle from '@/components/SectionTitle'
import { Card, CardContent, Stack } from '@mui/material'

export function Chart() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* Title */}
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <SectionTitle title="每月營收" />
            <SectionTitle title="近五年" />
          </Stack>

          {/* Chart */}
        </Stack>
      </CardContent>
    </Card>
  )
}
