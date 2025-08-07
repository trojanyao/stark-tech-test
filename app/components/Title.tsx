import { useLoading } from '@/contexts/LoadingContext'
import { Card, CardContent, Skeleton, Typography } from '@mui/material'

export default function Title({ selectedStock }: { selectedStock: IStock | null }) {
  const { loading } = useLoading()
  return (
    <Card>
      <CardContent>
        {loading ? (
          <Skeleton variant="text" width={200} />
        ) : selectedStock ? (
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
