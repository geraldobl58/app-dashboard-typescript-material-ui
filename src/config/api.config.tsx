import axios from 'axios'

import { errorInterceptor } from 'services/interceptors/ErrorInterceptor'
import { responseInterceptor } from 'services/interceptors/ResponseInterceptor'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
)

export { api }
