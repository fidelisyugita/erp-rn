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
      url: `login`,
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled

        if (data) {
          dispatch(setUserId(data?.uid))
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
