import { api } from '../../api'
import { getProfile } from './userApi'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getProfile: getProfile(build),
  }),
  overrideExisting: true,
})

export const { useGetProfileQuery } = userApi
