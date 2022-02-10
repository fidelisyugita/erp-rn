import { api } from '../../api'
import {
  getTransactionTypes,
  addTransactionType,
  editTransactionType,
  deleteTransactionType,
} from './transactionTypeApi'

import {
  getTransactionStatus,
  addTransactionStatus,
  editTransactionStatus,
  deleteTransactionStatus,
} from './transactionStatusApi'

export const transactionApi = api.injectEndpoints({
  endpoints: build => ({
    getTransactionTypes: getTransactionTypes(build),
    addTransactionType: addTransactionType(build),
    editTransactionType: editTransactionType(build),
    deleteTransactionType: deleteTransactionType(build),

    getTransactionStatus: getTransactionStatus(build),
    addTransactionStatus: addTransactionStatus(build),
    editTransactionStatus: editTransactionStatus(build),
    deleteTransactionStatus: deleteTransactionStatus(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetTransactionTypesQuery,
  useAddTransactionTypeMutation,
  useEditTransactionTypeMutation,
  useDeleteTransactionTypeMutation,

  useLazyGetTransactionStatusQuery,
  useAddTransactionStatusMutation,
  useEditTransactionStatusMutation,
  useDeleteTransactionStatusMutation,
} = transactionApi
