import currency from 'currency.js'

export const formatMoney = value => {
  console.log({ value })
  if (!value && value != 0) return '-'
  return currency(value, {
    symbol: 'Rp',
    separator: '.',
    decimal: ',',
  }).format()
}

export const formatNumber = value => {
  if (!value && value != 0) return '-'
  return currency(value, {
    symbol: '',
    separator: '.',
    decimal: '',
    precision: 0,
  }).format()
}

export const isNumeric = value => {
  return /^\d+$/.test(value)
}
