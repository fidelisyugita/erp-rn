import { api } from '../../api'
import fetchOne from './fetchOne'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: fetchOne(build),
  }),
  overrideExisting: true,
})

export const { useLazyFetchOneQuery } = userApi
