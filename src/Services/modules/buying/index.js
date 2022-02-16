import { api } from '../../api'
import {
  getBuyingStatus,
  addBuyingStatus,
  editBuyingStatus,
  deleteBuyingStatus,

  getBuyingType,
  addBuyingType,
  editBuyingType,
  deleteBuyingType,
} from './buyingApi'

export const buyingApi = api.injectEndpoints({
  endpoints: build => ({
    getBuyingStatus: getBuyingStatus(build),
    addBuyingStatus: addBuyingStatus(build),
    editBuyingStatus: editBuyingStatus(build),
    deleteBuyingStatus: deleteBuyingStatus(build),

    getBuyingType: getBuyingType(build),
    addBuyingType: addBuyingType(build),
    editBuyingType: editBuyingType(build),
    deleteBuyingType: deleteBuyingType(build),
  }),
  overrideExisting: true,
})

export const {
  useGetBuyingStatusQuery,
  useLazyGetBuyingStatusQuery,
  useAddBuyingStatusMutation,
  useEditBuyingStatusMutation,
  useDeleteBuyingStatusMutation,

  useGetBuyingTypeQuery,
  useLazyGetBuyingTypeQuery,
  useAddBuyingTypeMutation,
  useEditBuyingTypeMutation,
  useDeleteBuyingTypeMutation,
} = buyingApi
