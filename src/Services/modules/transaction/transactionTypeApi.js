import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getTransactionTypes = build => {
  return build.query({
    query: ({ params }) => ({
      url: `transactionType`,
      method: 'GET',
      params,
    }),
    providesTags: ['TransactionTypes'],
  })
}

export const addTransactionType = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'transactionType',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addTransactionTypeSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editTransactionType = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'transactionType',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateTransactionTypeSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteTransactionType = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `transactionType/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteTransactionTypeSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
