import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getBrands = build => {
  return build.query({
    query: ({ params }) => ({
      url: `brand`,
      method: 'GET',
      params,
    }),
    providesTags: ['Brands'],
  })
}

export const addBrand = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'brand',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addBrandSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editBrand = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'brand',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateBrandSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteBrand = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `brand/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteBrandSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}