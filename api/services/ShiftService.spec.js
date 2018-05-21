const ShiftService = require('./ShiftService')

describe('ShiftService : ', () => {
  test('hola mundo', () => {
    expect(2 + 2).toBe(4)
  })

  describe('createShift: ', () => {
    test('creates a shift', async () => {
      const params = {
        shiftType: {name: 'day'},
        serviceId: 1
      }

      const shift = await ShiftService.createShift(params)


      expect(shift.id).toBe(1)
    })
  })
})
