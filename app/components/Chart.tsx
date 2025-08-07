import SectionTitle from '@/components/SectionTitle'
import { Card, CardContent, Stack } from '@mui/material'
import {
  BarPlot,
  ChartDataProvider,
  ChartsAxisHighlight,
  ChartsLegend,
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot
} from '@mui/x-charts'

export function Chart({ dataset, children }: { dataset: IRevenue[]; children: React.ReactNode }) {
  // Convert IRevenue[] to the expected format for ChartContainer
  const formattedDataset = dataset.map((item) => ({
    ...item
  }))

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* Title */}
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <SectionTitle title="每月營收" />
            {children}
          </Stack>

          {/* Chart */}
          <ChartDataProvider
            height={300}
            dataset={formattedDataset}
            margin={{ top: 20, left: 0, bottom: 0, right: 0 }}
            xAxis={[
              {
                id: 'month',
                dataKey: 'date',
                scaleType: 'band',
                valueFormatter: (value: string) => String(value).slice(0, 7)
              }
            ]}
            yAxis={[
              {
                id: 'left-revenue-axis',
                scaleType: 'linear',
                position: 'left',
                width: 80
              },
              {
                id: 'right-rate-axis',
                scaleType: 'linear',
                position: 'right',
                width: 65
              }
            ]}
            series={[
              {
                type: 'bar',
                dataKey: 'revenue',
                label: '每月營收',
                yAxisId: 'left-revenue-axis',
                color: '#90caf9',
                valueFormatter: (value) => `${value} 千元`
              },
              {
                type: 'line',
                dataKey: 'growth_rate',
                label: '單月營收年增率',
                yAxisId: 'right-rate-axis',
                color: '#0d47a1',
                valueFormatter: (value) => (value ? `${value.toFixed(1)}%` : '无数据')
              }
            ]}
          >
            <ChartsLegend direction="horizontal" />

            <ChartsSurface>
              <BarPlot />
              <LinePlot />
              <ChartsXAxis />
              <ChartsYAxis
                axisId="left-revenue-axis"
                label="千元"
                labelStyle={{
                  transform: 'rotate(0)', // horizontal
                  textAnchor: 'start'
                }}
              />
              <ChartsYAxis
                axisId="right-rate-axis"
                label="%"
                labelStyle={{
                  transform: 'rotate(0)', // horizontal
                  textAnchor: 'end'
                }}
              />
              <ChartsTooltip trigger="axis" />
              <ChartsAxisHighlight x="line" y="none" />
            </ChartsSurface>
          </ChartDataProvider>
        </Stack>
      </CardContent>
    </Card>
  )
}
