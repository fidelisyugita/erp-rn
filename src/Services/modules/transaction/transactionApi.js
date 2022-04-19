import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getTransactions = build => {
  return build.query({
    query: ({ params }) => ({
      url: `transaction`,
      method: 'GET',
      params,
    }),
    providesTags: ['Transactions'],
  })
}

export const addTransaction = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'transaction',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addTransactionSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editTransaction = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'transaction',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateTransactionSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteTransaction = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `transaction/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteTransactionSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const trackTransaction = build => {
  return build.mutation({
    query: ({ id, body = {} }) => ({
      url: `transaction/${id}`,
      method: 'PUT',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('updateTransactionSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const downloadPdfTransaction = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `transaction/pdf/${id}`,
      method: 'POST',
    }),
  })
}

export const transactionOnline = build => {
  return build.mutation({
    query: () => ({
      url: 'transaction/online',
      method: 'POST',
    }),
  })
}
