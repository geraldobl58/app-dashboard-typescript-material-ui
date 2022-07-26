import { AxiosError } from 'axios'

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Whoops: Houve um erro de conexão'))
  }

  return Promise.reject(error)
}
