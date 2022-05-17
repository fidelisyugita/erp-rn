import { api } from '../../api'
import {
  getContacts,
  addContact,
  editContact,
  deleteContact,
} from './contactApi'
import { getContactTransactions } from './contactTransactionApi'

export const contactApi = api.injectEndpoints({
  endpoints: build => ({
    getContacts: getContacts(build),
    addContact: addContact(build),
    editContact: editContact(build),
    deleteContact: deleteContact(build),

    getContactTransactions: getContactTransactions(build),
  }),
  overrideExisting: true,
})

export const {
  useGetContactsQuery,
  useLazyGetContactsQuery,
  useAddContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,

  useGetContactTransactionsQuery,
  useLazyGetContactTransactionsQuery,
} = contactApi
