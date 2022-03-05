import i18n from '@/Translations'
import { navigateAndSimpleReset, pop } from '@/Navigators/utils'
import { Toast } from 'native-base'
import { api } from '@/Services/api'

export const getAttendances = build => {
  return build.query({
    query: ({ params }) => ({
      url: `attendance`,
      method: 'GET',
      params,
    }),
    providesTags: [{ type: 'Attendance', id: 'List' }],
  })
}

export const getAttendanceDetail = build => {
  return build.query({
    query: ({ id }) => ({
      url: `attendance/${id}`,
      method: 'GET',
    }),
    providesTags: [{ type: 'Attendance', id: 'Detail' }],
  })
}

export const addAttendance = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: 'attendance',
      method: 'POST',
      body,
    }),
    invalidatesTags: ['UserProfile'],
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('addAttendanceSuccess'),
          })
          navigateAndSimpleReset('Main')
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export const approveAttendance = build => {
  return build.mutation({
    query: ({ id }) => ({
      url: `attendance/approve/${id}`,
      method: 'PUT',
    }),
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data) {
          Toast.show({
            description: i18n.t('approveAttendanceSuccess'),
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
}
