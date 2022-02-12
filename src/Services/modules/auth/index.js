import { api } from '../../api'
import { forgotPassword, login, logout, refreshToken } from './authApi'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: login(build),
    logout: logout(build),
    refreshToken: refreshToken(build),
    forgotPassword: forgotPassword(build),
  }),
  overrideExisting: true,
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
  useForgotPasswordMutation,
} = authApi
