import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getTransactionStatus = build => {
  return build.query({
    query: ({ params }) => ({
      url: `transactionStatus`,
      method: 'GET',
      params,
    }),
    providesTags: ['TransactionStatus'],
  })
}

export const addTransactionStatus = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'transactionStatus',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addTransactionStatusSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editTransactionStatus = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'transactionStatus',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateTransactionStatusSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteTransactionStatus = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `transactionStatus/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteTransactionStatusSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
