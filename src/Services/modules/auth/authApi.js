import { navigateAndSimpleReset } from '@/Navigators/utils'
import { api } from '@/Services/api'
import {
  setUserId,
  setLoginPayload,
  setAccessToken,
  setRefreshToken,
  setCustomToken,
  setUserRole,
} from '@/Store/Session'
import i18n from '@/Translations'
import { Toast } from 'native-base'

export const login = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: `auth-login`,
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled

        if (data) {
          dispatch(setUserId(data?.user?.id))
          dispatch(setLoginPayload(data?.user))
          dispatch(setAccessToken(data?.accessToken))
          dispatch(setRefreshToken(data?.refreshToken))
          dispatch(setCustomToken(data?.customToken))
          dispatch(setUserRole(data?.user?.roles))

          navigateAndSimpleReset('Main')
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const logout = build => {
  return build.mutation({
    query: ({ body = {} }) => ({
      url: `auth-logout`,
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { dispatch }) {
      dispatch(api.util.resetApiState())
    },
  })
}

export const forgotPassword = build => {
  return build.mutation({
    query: ({ body = {} }) => ({
      url: `auth-resetPassword`,
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled

        if (data.ok) {
          navigateAndSimpleReset('LoginScreen')
          Toast.show({ description: i18n.t('forgotPasswordSuccess') })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const refreshToken = build => {
  return build.query({
    query: ({ body }) => ({
      url: 'auth-refreshToken',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled

        if (data) {
          dispatch(setAccessToken(data?.newAccessToken))
          dispatch(setRefreshToken(data?.newRefreshToken))
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
