import { apiRequest } from '@/lib/apiRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UseMutationOptions<TData = any, TVariables = any> {
  url: string
  method?: 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  invalidateKeys?: string[]
  onSuccess?: (data: TData) => void
  onError?: (error: unknown) => void
}

export const useMutationApi = <TData = any, TVariables = any>({
  url,
  method = 'POST',
  headers = {},
  invalidateKeys = [],
  onSuccess,
  onError,
}: UseMutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient()

  return useMutation<TData, unknown, TVariables>({
    mutationFn: (variables: TVariables) =>
      apiRequest<TData>({
        url,
        method,
        data: variables,
        headers,
      }),

    onSuccess: (response) => {
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      )

      onSuccess?.(response)
    },

    onError: (error) => {
      console.error(`Mutation error on ${url}:`, error)
      onError?.(error)
    },
  })
}
