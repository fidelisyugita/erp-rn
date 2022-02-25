import { setLoginPayload, setUserRole } from '@/Store/Session'

export const getProfile = build => {
  return build.query({
    query: () => ({
      url: `user/getProfile`,
      method: 'GET',
    }),
    providesTags: ['UserProfile'],
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled

        if (data) {
          dispatch(setLoginPayload(data))
          dispatch(setUserRole(data?.roles))
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
