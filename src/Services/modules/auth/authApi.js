import { navigateAndSimpleReset } from '@/Navigators/utils'
import {
  setUserId,
  setLoginPayload,
  setAccessToken,
  setRefreshToken,
  setCustomToken,
} from '@/Store/Session'

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
    query: ({ body }) => ({
      url: `auth-logout`,
      method: 'POST',
      body,
    }),
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
