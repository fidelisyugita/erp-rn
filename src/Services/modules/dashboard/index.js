import { api } from '../../api'
import { getDasbhoard } from './dashboardApi'

export const dashboardApi = api.injectEndpoints({
  endpoints: build => ({
    getDasbhoard: getDasbhoard(build),
  }),
  overrideExisting: true,
})

export const { useGetDasbhoardQuery } = dashboardApi
