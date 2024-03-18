import { api } from '../../services/api'

export const login = async (data) => {
  return api.post('/login', data)
}
