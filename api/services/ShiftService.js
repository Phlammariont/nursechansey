const moment = require('moment')
const {mapObjectId} = require('../utils/ramda')
const {daysOfWeek, formatDate} = require('../utils/time')

const {map, times, propOr, prop, mapObjIndexed, values, head} = require('ramda')

const getPlannerShifts = async planner => {
  try {
    const shiftAssignments = await getShiftAssignment(planner.services)
    return await createShiftsFromAssignments(shiftAssignments, planner.timeLapse)
  } catch (e) {
    console.log(e)
  }
  return null
}

const getShiftAssignment = async (services) => {
  return await ShiftAssignment.find({
    'serviceId': mapObjectId(services)
  })
}

const createShiftsFromAssignments = async (shiftAssignments, timeLapse) => {
  let date = moment(timeLapse.startDate)
  let shifts = []
  while (date.isBefore(timeLapse.endDate)) {
    await Promise.all(map( async shiftAssignment => {
      const qty = getAssignedShiftsQty(shiftAssignment.assignment, date.isoWeekday())
      if (qty === 0) return

      const createdShifts = await processShiftAssignation({
        date: formatDate(date),
        numberByType: qty,
        serviceId: shiftAssignment.serviceId
      })
      shifts = [...shifts, ...createdShifts]
    }, shiftAssignments))
    date.add(1, 'days')
  }
  return shifts
}

const getAssignedShiftsQty = (shiftAssignment, dayOfWeek) => {
  return propOr(0, prop(dayOfWeek, daysOfWeek), shiftAssignment)
}

const processShiftAssignation = async ({date, numberByType, serviceId}) => {
  let shifts = []
  const service = await Service.findOne({
    'id': serviceId
  })
  await Promise.all(
    values(
      mapObjIndexed(async (value, key) => {
        const createdShifts = await createShifts({date, type: {name: key, code: head(key).toUpperCase()}, service, number: value})
        shifts = [...shifts, ...createdShifts]
      }, numberByType)
    )
  )
  return shifts
}

const createShifts = async ({date, type, service, number = 1}) => {
  return await Promise.all( times( async () => await createShift({date, shiftType: type, service}), number) )
}

const createShift = async ({date, shiftType, service}) => {
  return await Shift.create({date, shiftType, service}).fetch()
}

module.exports = {
  getPlannerShifts,
  createShift
}
