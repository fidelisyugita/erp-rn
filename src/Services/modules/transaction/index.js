import { api } from '../../api'

import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  downloadPdfTransaction,
} from './transactionApi'

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
    getTransactions: getTransactions(build),
    addTransaction: addTransaction(build),
    editTransaction: editTransaction(build),
    deleteTransaction: deleteTransaction(build),
    downloadPdfTransaction: downloadPdfTransaction(build),

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
  useLazyGetTransactionsQuery,
  useAddTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useDownloadPdfTransactionMutation,

  useGetTransactionTypesQuery,
  useLazyGetTransactionTypesQuery,
  useAddTransactionTypeMutation,
  useEditTransactionTypeMutation,
  useDeleteTransactionTypeMutation,
  
  useGetTransactionStatusQuery,
  useLazyGetTransactionStatusQuery,
  useAddTransactionStatusMutation,
  useEditTransactionStatusMutation,
  useDeleteTransactionStatusMutation,
} = transactionApi
