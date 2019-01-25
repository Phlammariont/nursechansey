const moment = require('moment')
const {mapObjectId} = require('../utils/ramda')
const {daysOfWeek, formatDate} = require('../utils/time')

const {map, times, propOr, prop, mapObjIndexed, values, head} = require('ramda')

const getPlannerShifts = async planner => {
  try {
    const shiftAssignments = await getShiftAssignment(planner.services)
    return await createShiftsFromAssignments(shiftAssignments, planner)
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

const createShiftsFromAssignments = async (shiftAssignments, {timeLapse, id: plannerId, nurseType}) => {
  let date = moment(timeLapse.startDate)
  let shifts = []
  while (date.isBefore(timeLapse.endDate)) {
    await Promise.all(map( async shiftAssignment => {
      const qty = getAssignedShiftsQty(shiftAssignment.assignment[getNurseType(nurseType)], date.isoWeekday())
      if (qty === 0) return

      const createdShifts = await processShiftAssignation({
        date: formatDate(date),
        numberByType: qty,
        serviceId: shiftAssignment.serviceId,
        plannerId
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

const processShiftAssignation = async ({date, numberByType, serviceId, plannerId}) => {
  let shifts = []
  const service = await Service.findOne({
    'id': serviceId
  })
  await Promise.all(
    values(
      mapObjIndexed(async (value, key) => {
        const createdShifts = await createShifts({
          type: {
            name: key,
            code: head(key).toUpperCase()
          },
          number: value,
          date,
          service,
          plannerId
        })
        shifts = [...shifts, ...createdShifts]
      }, numberByType)
    )
  )
  return shifts
}

const createShifts = async ({plannerId, date, type, service, number = 1}) => {
  return await Promise.all( times( async () => await createShift({plannerId, date, shiftType: type, service}), number) )
}

const createShift = async ({plannerId, date, shiftType, service}) => {
  return await Shift.create({plannerId, date, shiftType, service}).fetch()
}

const getShiftsByPlannerId = async plannerId => {
  return await Shift.find({
    plannerId
  })
}

module.exports = {
  getShiftsByPlannerId,
  getPlannerShifts,
  createShift
}

const getNurseType = nurseType => nurseType.name.toLowerCase()
