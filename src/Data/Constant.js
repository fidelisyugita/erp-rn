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
  { id: 'MasterContactScreen', label: i18n.t('contact'), icon: 'contacts' },
  {
    id: 'MasterMeasureUnitScreen',
    label: i18n.t('measureUnit'),
    icon: 'tape-measure',
  },
  {
    id: 'MasterProductCategoryScreen',
    label: i18n.t('productCategory'),
    icon: 'crop-square',
  },
  {
    id: 'MasterTransactionStatusScreen',
    label: i18n.t('transactionStatus'),
    icon: 'progress-check',
  },
  {
    id: 'MasterTransactionTypeScreen',
    label: i18n.t('transactionType'),
    icon: 'cash-multiple',
  },
]

export const ROLE = ['ACCOUNTANT', 'SALES', 'PURCHASE', 'INVENTORY']

const ACCESS = ['create', 'read', 'update', 'delete', 'download']

export const MENU = [
  {
    name: 'Dashboard',
    roleAccess: [
      { role: 'ACCOUNTANT', access: ['create', 'read', 'update', 'delete'] },
      { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
    ],
  },
  {
    name: 'Master',
    roleAccess: [
      { role: 'ACCOUNTANT', access: ['create', 'read', 'update', 'delete'] },
      { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
    ],
    menu: [
      // hide until next instruction
      // {
      //   id: 'MasterBuyingStatusScreen',
      //   name: 'MasterBuyingStatusScreen',
      //   label: i18n.t('buyingStatus'),
      //   icon: 'cart-check',
      //   roleAccess: [
      //     {
      //       role: 'ACCOUNTANT',
      //       access: ['create', 'read', 'update', 'delete'],
      //     },
      //     { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
      //   ],
      // },
      {
        id: 'MasterBuyingTypeScreen',
        name: 'MasterBuyingTypeScreen',
        label: i18n.t('buyingType'),
        icon: 'cart-variant',
        roleAccess: [
          {
            role: 'ACCOUNTANT',
            access: ['create', 'read', 'update', 'delete'],
          },
          { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
          { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
          { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
        ],
      },
      // hide until next instruction
      // {
      //   id: 'MasterBrandScreen',
      //   name: 'MasterBrandScreen',
      //   label: i18n.t('brand'),
      //   icon: 'tag',
      //   roleAccess: [
      //     {
      //       role: 'ACCOUNTANT',
      //       access: ['create', 'read', 'update', 'delete'],
      //     },
      //     { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
      //   ],
      // },
      // {
      //   id: 'MasterMeasureUnitScreen',
      //   name: 'MasterMeasureUnitScreen',
      //   label: i18n.t('measureUnit'),
      //   icon: 'tape-measure',
      //   roleAccess: [
      //     {
      //       role: 'ACCOUNTANT',
      //       access: ['create', 'read', 'update', 'delete'],
      //     },
      //     { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
      //   ],
      // },
      // {
      //   id: 'MasterProductCategoryScreen',
      //   name: 'MasterProductCategoryScreen',
      //   label: i18n.t('productCategory'),
      //   icon: 'crop-square',
      //   roleAccess: [
      //     {
      //       role: 'ACCOUNTANT',
      //       access: ['create', 'read', 'update', 'delete'],
      //     },
      //     { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
      //   ],
      // },
      // {
      //   id: 'MasterTransactionStatusScreen',
      //   name: 'MasterTransactionStatusScreen',
      //   label: i18n.t('transactionStatus'),
      //   icon: 'progress-check',
      //   roleAccess: [
      //     {
      //       role: 'ACCOUNTANT',
      //       access: ['create', 'read', 'update', 'delete'],
      //     },
      //     { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      //     { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
      //   ],
      // },
      {
        id: 'MasterTransactionTypeScreen',
        name: 'MasterTransactionTypeScreen',
        label: i18n.t('transactionType'),
        icon: 'cash-multiple',
        roleAccess: [
          {
            role: 'ACCOUNTANT',
            access: ['create', 'read', 'update', 'delete'],
          },
          { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
          { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
          { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
        ],
      },
    ],
  },
  {
    id: 'Contact',
    name: 'Contact',
    label: i18n.t('contact'),
    icon: 'contacts',
    roleAccess: [
      {
        role: 'ACCOUNTANT',
        access: ['create', 'update', 'delete'],
      },
      { role: 'SALES', access: ['create', 'read', 'update', 'delete'] },
      { role: 'PURCHASE', access: ['create', 'read', 'update', 'delete'] },
      { role: 'INVENTORY', access: ['create', 'read', 'update', 'delete'] },
    ],
  },
  {
    name: 'ProductScreen',
    roleAccess: [
      {
        role: 'ACCOUNTANT',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
      {
        role: 'SALES',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
      {
        role: 'PURCHASE',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
      {
        role: 'INVENTORY',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
    ],
  },
  {
    name: 'Transaction',
    roleAccess: [
      {
        role: 'ACCOUNTANT',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
      {
        role: 'SALES',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
      {
        role: 'PURCHASE',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
      {
        role: 'INVENTORY',
        access: ['create', 'read', 'update', 'delete', 'download'],
      },
    ],
  },
  {
    name: 'Attendance',
    roleAccess: [
      {
        role: 'ADMIN',
        access: ['read', 'update'],
      },
    ],
  },
]

export const LIMIT_LOAD_DATA = 10

export const ERROR_MESSAGE_SERVER = ['Invalid token']

export const ATTENDANCE_APPROVE_STATUS = [i18n.t('pending'), i18n.t('approved')]
