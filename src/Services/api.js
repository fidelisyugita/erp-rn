import { Config } from '@/Config'
import { ERROR_MESSAGE_SERVER } from '@/Data/Constant'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { reset } from '@/Store/Session'
import i18n from '@/Translations'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Toast } from 'native-base'

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().session?.accessToken

    if (token) headers.set('authorization', `Bearer ${token}`)

    return headers
  },
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result?.error) {
    if (
      result?.error?.status === 500 &&
      ERROR_MESSAGE_SERVER.includes(result?.error?.data?.message)
    ) {
      //force logout
      api.dispatch(reset())
      navigateAndSimpleReset('LoginScreen')
    }
    Toast.show({
      description: result?.error?.data?.message
        ? `${result?.error?.data?.message} (${result?.error?.status})`
        : i18n.t('unkonwnError'),
    })
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ['Products', 'ProductCategories'],
})
