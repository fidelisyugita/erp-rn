import i18n from '@/Translations'
import { pop } from '@/Navigators/utils'
import { Toast } from 'native-base'

export const getContacts = build => {
  return build.query({
    query: ({ params }) => ({
      url: `contact`,
      method: 'GET',
      params,
    }),
    providesTags: ['Contacts'],
  })
}

export const addContact = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'contact',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addContactSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const editContact = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'contact',
      method: 'POST',
      body,
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('updateContactSuccess'),
          })
        }
        pop?.()
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const deleteContact = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `contact/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const result = await queryFulfilled

        if (result) {
          Toast.show({
            description: i18n.t('deleteContactSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
