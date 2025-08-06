import { fetchFinmind } from '@/lib/finmind'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const dataset = searchParams.get('dataset')
  const data_id = searchParams.get('data_id')
  const start_date = searchParams.get('start_date')
  const end_date = searchParams.get('end_date')

  if (!dataset) {
    return NextResponse.json({ error: 'dataset is required' }, { status: 400 })
  }

  try {
    const res = await fetchFinmind({
      dataset,
      data_id,
      start_date,
      end_date
    })

    return NextResponse.json({ data: res })
  } catch (err) {
    console.error('[Finmind API error] ', err)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
