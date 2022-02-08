import { api } from '../../api'
import { login, logout, refreshToken } from './authApi'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: login(build),
    logout: logout(build),
    refreshToken: refreshToken(build),
  }),
  overrideExisting: true,
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
} = authApi
