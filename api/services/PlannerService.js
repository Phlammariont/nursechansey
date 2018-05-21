const getPlannerMessage = async (plannerDto) => {
  const shifts = await ShiftService.getPlannerShifts(plannerDto)
  const users = await UserService.getPlannerNurses(plannerDto)
  return {
    ...plannerDto,
    shifts,
    users
  }
}

module.exports = {
  getPlannerMessage
}
