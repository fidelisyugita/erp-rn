import moment from 'moment'
export const dateRangeConverter = ({ firstDate, secondDate }) => {
  if (firstDate == secondDate) {
    return moment(firstDate).format('DD-MM-YYYY')
  }
  return `${moment(firstDate).format('DD/MM/YYYY')} - ${moment(
    secondDate,
  ).format('DD/MM/YYYY')}`
}
