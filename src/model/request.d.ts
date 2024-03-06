interface ListData<T> {
  list: T[]
  page?: {
    pageSize: number
    pageNum: number
    pages: number
    total: number
  }
}

type HttpMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

interface HttpParams {
  service?: string
  url?: string
  data?: any
  method?: HttpMethod
  loading?: boolean
}

interface PageParams {
  pageNum: number
  pageSize: number
}

declare type HttpPageParams = HttpParams & PageParams
