import { AxiosRequestConfig } from 'axios'
import api from '../config/axios-config'

export interface ApiRequestOptions extends AxiosRequestConfig {
  url: string
}

export const apiRequest = async <T = any>({
  url,
  method = 'GET',
  data,
  params,
  headers,
}: ApiRequestOptions): Promise<T> => {
  try {
    const response = await api({ url, method, data, params, headers })
    return response.data
  } catch (err) {
    console.error(`API request error: ${method} ${url}`, err)
    throw err
  }
}

// Convenience wrappers
export const apiGet = <T = any>(url: string, options?: Omit<ApiRequestOptions, 'url' | 'method'>) =>
  apiRequest<T>({ url, method: 'GET', ...options })

export const apiPost = <T = any>(url: string, data?: any, options?: Omit<ApiRequestOptions, 'url' | 'method' | 'data'>) =>
  apiRequest<T>({ url, method: 'POST', data, ...options })

export const apiPut = <T = any>(url: string, data?: any, options?: Omit<ApiRequestOptions, 'url' | 'method' | 'data'>) =>
  apiRequest<T>({ url, method: 'PUT', data, ...options })

export const apiDelete = <T = any>(url: string, options?: Omit<ApiRequestOptions, 'url' | 'method'>) =>
  apiRequest<T>({ url, method: 'DELETE', ...options })
