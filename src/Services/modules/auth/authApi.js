import { navigateAndSimpleReset } from '@/Navigators/utils'

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

        navigateAndSimpleReset('Main')
      } catch (error) {
        console.error(error)
      }
    },
  })
}
