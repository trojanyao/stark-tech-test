import { Card, CardContent, Typography } from '@mui/material'

export default function Title({ selectedStock }: { selectedStock: IStock | null }) {
  return (
    <Card>
      <CardContent>
        {selectedStock ? (
          <Typography sx={{ fontSize: 18, fontWeight: 'semibold' }}>
            {selectedStock?.stock_name}（{selectedStock?.stock_id}）
          </Typography>
        ) : (
          '请选择股票'
        )}
      </CardContent>
    </Card>
  )
}
