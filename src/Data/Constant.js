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
