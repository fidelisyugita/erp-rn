import { api } from '../../api'
import {
  getContacts,
  addContact,
  editContact,
  deleteContact,
} from './contactApi'

export const contactApi = api.injectEndpoints({
  endpoints: build => ({
    getContacts: getContacts(build),
    addContact: addContact(build),
    editContact: editContact(build),
    deleteContact: deleteContact(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetContactsQuery,
  useAddContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
} = contactApi
