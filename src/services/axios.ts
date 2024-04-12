import axios, { AxiosInstance, AxiosResponse } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5173/',
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    if (error.response) {
      console.error('Erro de resposta do servidor:', error.response.status)
    } else if (error.request) {
      console.error('Erro de solicitação:', error.request)
    } else {
      console.error('Erro ao processar solicitação:', error.message)
    }

    return Promise.reject(error)
  }
)

export { api }
