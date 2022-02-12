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
    } else if (result?.error?.status === 401) {
      const token = api.getState().session?.refreshToken
      api.dispatch(api.endpoints.refreshToken.initiate({ refreshToken: token }))
    }
    Toast.show({
      description: errorMessage(result),
    })
  }
  return result
}

const errorMessage = result => {
  if (result?.error?.data) {
    const data = result.error.data
    if (data.message) {
      return errorString(data.message, data.status)
    } else if (data.code) {
      return errorString(data.name, data.code)
    } else {
      return errorString()
    }
  }
}

const errorString = (message = i18n.t('unknownError'), code) => {
  return `${message} ${code ? `(${code})` : ''}`
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  endpoints: () => ({}),
  tagTypes: [
    'Products',
    'ProductCategories',
    'MeasureUnits',
    'TransactionTypes',
    'TransactionStatus',
    'Contacts',
  ],
})
