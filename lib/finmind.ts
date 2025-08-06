export interface FetchParams {
  dataset: string
  data_id?: string | null
  start_date?: string | null
  end_date?: string | null
}

const BASE_URL = 'https://api.finmindtrade.com/api/v4/data'

export async function fetchFinmind(params: FetchParams) {
  const { dataset, data_id, start_date, end_date } = params

  if (!dataset) {
    throw new Error('dataset is required')
  }

  const url = new URL(BASE_URL)

  url.searchParams.set('dataset', dataset)
  if (data_id) url.searchParams.set('data_id', data_id)
  if (start_date) url.searchParams.set('start_date', start_date)
  if (end_date) url.searchParams.set('end_date', end_date)

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.FINMIND_API_KEY!}`
    },
    cache: 'no-store'
  })

  const json = await res.json()
  return json.data
}
