describe('ShiftService : ', () => {
  test('hola mundo', () => {
    expect(2 + 2).toBe(4)
  })

  describe('createShift: ', () => {
    test('creates a shift', async () => {
      const params = {
        shiftType: {name: 'day'},
        service: {serviceId: 1},
        date: '01/01/2018'
      }

      const shift = await ShiftService.createShift(params)

      expect(shift.id).toBeTruthy()
    })
  })

  describe('getPlannerShifts: ', () => {
    test ('creates a shift', async () => {
      const {planner, service} = await setUpPlanner()

      const messageShifts = await ShiftService.getPlannerShifts(planner)
      const shifts = await Shift.find()
      const [shift]  = shifts

      expect(messageShifts.length).toBe(shifts.length)
      expect(messageShifts.length).toBe(1)
      expect(shift.shiftType.name).toBe('day')
      expect(shift.service.id).toBe(service.id)
    })

    test('creates 2 shifts for the same day', async () => {
      const {planner, service} = await setUpPlanner({
        assignmentParams: {
          Friday: {
            day: 2,
          }
        }
      })

      const messageShifts = await ShiftService.getPlannerShifts(planner)
      const shifts = await Shift.find()
      const [dayShift, nightShift]  = shifts

      expect(messageShifts.length).toBe(2)
      expect(messageShifts.length).toBe(shifts.length)
      expect(dayShift.shiftType.name).toBe('day')
      expect(dayShift.service.id).toBe(service.id)
      expect(nightShift.shiftType.name).toBe('day')
      expect(nightShift.service.id).toBe(service.id)
    })

    test('creates 2 shifts for the same day with diferent type', async () => {
      const {planner, service} = await setUpPlanner({
        assignmentParams: {
          Friday: {
            day: 1,
            night: 1
          }
        }
      })

      const messageShifts = await ShiftService.getPlannerShifts(planner)
      const shifts = await Shift.find()
      const [dayShift, nightShift]  = shifts

      expect(messageShifts.length).toBe(2)
      expect(messageShifts.length).toBe(shifts.length)
      expect(dayShift.shiftType.name).toBe('day')
      expect(dayShift.service.id).toBe(service.id)
      expect(nightShift.shiftType.name).toBe('night')
      expect(nightShift.service.id).toBe(service.id)
    })

    test('creates 2 shifts for 2 days each', async () => {
      const {planner, service} = await setUpPlanner({
        assignmentParams: {
          Friday: {
            day: 1,
            night: 1
          },
          Saturday: {
            day: 1,
            night: 1
          }
        }
      })

      const messageShifts = await ShiftService.getPlannerShifts(planner)
      const shifts = await Shift.find()
      const [dayShift, nightShift]  = shifts

      expect(messageShifts.length).toBe(4)
      expect(messageShifts.length).toBe(shifts.length)
      expect(dayShift.shiftType.name).toBe('day')
      expect(dayShift.service.id).toBe(service.id)
      expect(nightShift.shiftType.name).toBe('night')
      expect(nightShift.service.id).toBe(service.id)
    })
  })
})

const setUpPlanner = async ({assignmentParams} = {}) => {
  const title = await Title.create({name: 'Enfermera Jefe'}).fetch()
  const user = await User.create({
    title,
    name: 'leon rueda',
    email: 'leon@nurse.com',
    password: 'demo987',
  }).fetch()
  const service = await Service.create({name: 'Urgencias', color: 'red'}).fetch()
  const building = await Building.create({name: 'Main Building', services: [service]})
  const assignment = await ShiftAssignment.create({
    serviceId: service.id,
    assignment: assignmentParams || {
      Friday: {
        day: 1
      }
    }
  })
  return {
    service,
    planner: {
      name: 'test planner',
      services: [service],
      nurses: [user],
      building: building,
      timeLapse: {
        startDate: '2018-06-01',
        endDate: '2018-06-07'
      }
    }
  }
}
