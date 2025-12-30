import { apiGet } from '@/lib/apiRequest'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface UseFetchProp {
  keys: string[]
  url: string
  options?: {
    enabled?: boolean
    refetchInterval?: number
    retry?: number
    staleTime?: number
    params?: Record<string, any>
    headers?: Record<string, string>
  }
}

export const useFetch = ({
  keys,
  url,
  options = {},
}: UseFetchProp): UseQueryResult<any, Error> => {
  const { enabled = true, refetchInterval, retry, staleTime, params, headers } = options

  return useQuery({
    queryKey: keys,
    queryFn: () => apiGet(url, { params, headers }),
    enabled,
    refetchInterval,
    retry,
    staleTime,
  })
}
