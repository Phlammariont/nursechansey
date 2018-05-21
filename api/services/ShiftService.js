const moment = require('moment')
const {mapObjectId} = require('../utils/ramda')
const {daysOfWeek} = require('../utils/time')

const {forEachObjIndexed, forEach, times} = require('ramda')

const getPlannerShifts = async planner => {
  console.log("from shift service!!")


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
    forEach( async shiftAssignment => {
      const createdShifts = await processShiftAssignation({
        date,
        numberByType: getAssignedShifts(shiftAssignment.assignment, date.isoWeekday()),
        serviceId: shiftAssignment.serviceId
      })
      shifts = [...shifts, ...createdShifts]
    }, shiftAssignments)
    date.add(1, 'days')
  }
  return shifts
}

const getAssignedShifts = (shiftAssignment, dayOfWeek) => {
  return shiftAssignment[daysOfWeek[dayOfWeek]]
}

const processShiftAssignation = async ({date, numberByType, serviceId}) => {
  let shifts = []
  const service = await Service.find({
    'id': serviceId
  })
  forEachObjIndexed(async (value, key) => {
    const createdShifts = await createShifts({date, key, value, service})
    return [...shifts, ...createdShifts]
  }, numberByType)
  return shifts
}

const createShifts = async ({date, type, number = 1, service}) => {
  return await times(async () => await createShift({date, shiftType: {name: type}, service}), number)
}

const createShift = async ({date, shiftType, service}) => {
  return await Shift.create({date, shiftType, service}).fetch()
}

module.exports = {
  getPlannerShifts,
  createShift
}
