import axios, { AxiosInstance } from 'axios'

function getClient(baseUrl: string, timeout: number): AxiosInstance {
  return axios.create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default getClient
