import { api } from '../../api'
import { login } from './authApi'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: login(build),
  }),
  overrideExisting: false,
})

export const { useLoginMutation } = userApi
