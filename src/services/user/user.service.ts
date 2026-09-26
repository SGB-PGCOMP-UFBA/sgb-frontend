import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { buildHeaders } from '@/lib/api-headers'
import type { ManagedUser, UserFilters } from '@/types'

const BASE_USER_API_PATH = `/v1/user`

export const getUsers = async (
  filters: UserFilters = {}
): Promise<AxiosResponse<ManagedUser[]>> => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => Boolean(value))
  )

  return api.get(BASE_USER_API_PATH, {
    headers: buildHeaders(),
    params,
  })
}
