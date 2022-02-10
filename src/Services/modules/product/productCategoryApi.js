import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: 'LIST' }]
}

export const getProductCategories = build => {
  return build.query({
    query: ({ params }) => ({
      url: `productCategory`,
      method: 'GET',
      params,
    }),
    providesTags: ['ProductCategories'],
  })
}

export const addProductCategory = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'productCategory',
      method: 'POST',
      body,
    }),
    // invalidatesTags: ['ProductCategories'],
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addProductCategorySuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editProductCategory = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'productCategory',
      method: 'POST',
      body,
    }),
    // invalidatesTags: ['ProductCategories'],
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateProductCategorySuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteProductCategory = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `productCategory/${id}`,
      method: 'DELETE',
    }),
    // invalidatesTags: ['ProductCategories'],
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteProductCategorySuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
