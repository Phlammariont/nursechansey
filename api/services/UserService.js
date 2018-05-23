const {mapObjectId} = require("../utils/ramda");


const getPlannerNurses = async planer => {
  return await User.find({
    id: mapObjectId(planer.nurses)
  })
}

module.exports = {
  getPlannerNurses
}
