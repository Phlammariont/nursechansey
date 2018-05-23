
const daysOfWeek = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
}

const formatDate = date => date.format('YYYY-MM-DD')

module.exports = {
  daysOfWeek,
  formatDate
}
