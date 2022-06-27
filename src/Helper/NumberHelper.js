import currency from 'currency.js'
import numbro from 'numbro'

export const formatMoney = value => {
  if (!value && value != 0) return '-'
  return currency(value, {
    symbol: 'Rp',
    separator: '.',
    decimal: ',',
  }).format()
}

export const formatNumber = value => {
  if (!value && value != 0) return '-'
  return numbro(value || 0).format({
    thousandSeparated: true,
  })
}

export const isNumeric = value => {
  return /^\d+$/.test(value)
}
