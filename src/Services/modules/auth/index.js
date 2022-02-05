import { api } from '../../api'
import { login } from './authApi'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: login(build),
  }),
  overrideExisting: true,
})

export const { useLoginMutation } = authApi
