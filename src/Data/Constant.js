import i18n from '@/Translations'

export const ACCOUNTING_MENU = [
  {
    id: 'customerInvoices',
    label: i18n.t('customerInvoices'),
    value: 'customerInvoices',
  },
  {
    id: 'billsToPay',
    label: i18n.t('billsToPay/Vendor'),
    value: 'billsToPay',
  },
  {
    id: 'pettyCash',
    label: i18n.t('pettyCash'),
    value: 'pettyCash',
  },
  {
    id: 'reporting',
    label: i18n.t('reporting'),
    value: 'reporting',
  },
  {
    id: 'createInvoice',
    label: i18n.t('createInvoice'),
    value: 'createInvoice',
  },
  {
    id: 'employee',
    label: i18n.t('employee'),
    value: 'employee',
  },
]

export const MASTER_MENU = [
  {
    id: 'MasterProductCategoryScreen',
    label: i18n.t('productCategory'),
    icon: 'cube',
  },
  { id: 'MasterMeasureUnitScreen', label: i18n.t('measureUnit'), icon: 'cube' },
  { id: 'MasterProductScreen', label: i18n.t('product'), icon: 'cube' },
  { id: 'MasterContactcreen', label: i18n.t('contact'), icon: 'contacts' },
  { id: 'MasterUserScreen', label: i18n.t('User'), icon: 'account' },
]

export const ROLE = {}

export const LIMIT_LOAD_DATA = 10

export const ERROR_MESSAGE_SERVER = ['Invalid token']
