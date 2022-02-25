import { api } from '../../api'
import {
  getAttendances,
  getAttendanceDetail,
  addAttendance,
  approveAttendance,
} from './attendanceApi'

export const attendanceApi = api.injectEndpoints({
  endpoints: build => ({
    getAttendances: getAttendances(build),
    getAttendanceDetail: getAttendanceDetail(build),
    addAttendance: addAttendance(build),
    approveAttendance: approveAttendance(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetAttendancesQuery,
  useGetAttendanceDetailQuery,
  useAddAttendanceMutation,
  useApproveAttendanceMutation,
} = attendanceApi
