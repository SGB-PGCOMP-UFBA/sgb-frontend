import axios from 'axios'
import { installSessionRefresh } from './session-refresh'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL_API}`,
})

installSessionRefresh(api, () => {
  if (window.location.pathname !== '/') {
    window.location.replace('/')
  }
})

export { api }
