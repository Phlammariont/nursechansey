/**
 * ShiftController
 *
 * @description :: Server-side logic for managing shifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const getShiftsByPlanner = async (req, res) => {
  const shifts = await ShiftService.getShiftsByPlannerId(req.param('plannerId'))
  res.send(shifts)
}

module.exports = {
  getShiftsByPlanner
};

