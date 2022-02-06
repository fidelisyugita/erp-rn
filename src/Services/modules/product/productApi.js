import { navigateAndSimpleReset } from '@/Navigators/utils'
import { setAccessToken, setLoginPayload, setUserId } from '@/Store/Session'

export const getProducts = build => {
  return build.query({
    query: ({ params }) => ({
      url: `product`,
      method: 'GET',
      params,
    }),
  })
}
