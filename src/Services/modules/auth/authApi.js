import { navigateAndSimpleReset } from '@/Navigators/utils'
import { setAccessToken, setLoginPayload, setUserId } from '@/Store/Session'

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
          dispatch(setAccessToken(data?.accessToken))
          dispatch(setUserId(data?.user?.id))
          dispatch(setLoginPayload(data))

          navigateAndSimpleReset('Main')
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
