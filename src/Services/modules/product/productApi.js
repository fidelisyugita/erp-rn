import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getProducts = build => {
  return build.query({
    query: ({ params }) => ({
      url: `product`,
      method: 'GET',
      params,
    }),
    providesTags: ['Products'],
  })
}

export const addProduct = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'product',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addProductSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editProduct = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'product',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateProductSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteProduct = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `product/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteProductSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
