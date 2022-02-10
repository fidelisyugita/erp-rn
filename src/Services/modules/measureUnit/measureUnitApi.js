import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getMeasureUnits = build => {
  return build.query({
    query: ({ params }) => ({
      url: `measureUnit`,
      method: 'GET',
      params,
    }),
    providesTags: ['MeasureUnits'],
  })
}

export const addMeasureUnit = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'measureUnit',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addMeasureUnitSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editMeasureUnit = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'measureUnit',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateMeasureUnitSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteMeasureUnit = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `measureUnit/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteMeasureUnitSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
