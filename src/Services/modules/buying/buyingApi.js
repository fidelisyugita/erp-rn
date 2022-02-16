import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getBuyingStatus = build => {
  return build.query({
    query: ({ params }) => ({
      url: `buyingStatus`,
      method: 'GET',
      params,
    }),
    providesTags: ['BuyingStatus'],
  })
}

export const addBuyingStatus = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'buyingStatus',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addBuyingStatusSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editBuyingStatus = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'buyingStatus',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateBuyingStatusSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteBuyingStatus = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `buyingStatus/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteBuyingStatusSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const getBuyingType = build => {
  return build.query({
    query: ({ params }) => ({
      url: `buyingType`,
      method: 'GET',
      params,
    }),
    providesTags: ['BuyingType'],
  })
}

export const addBuyingType = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'buyingType',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addBuyingTypeSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editBuyingType = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'buyingType',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateBuyingTypeSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteBuyingType = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `buyingType/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteBuyingTypeSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}

