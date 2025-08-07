export {}

declare global {
  interface IStock {
    date: string
    industry_category: string
    stock_id: string
    stock_name: string
    type: string
  }

  interface IRevenue {
    stock_id: string
    country: string
    date: string
    revenue: number
    revenue_month: number
    revenue_year: number
    growth_rate?: number | null
  }
}
