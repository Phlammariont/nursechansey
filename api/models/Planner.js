/**
 * Planner.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    name: {
      type:'string',
      required: true,
      unique: false
    },
    building: {
      type: 'json',
      required: true,
      unique: false
    },
    services: {
      type: 'json',
      required: true,
    },
    nurses: {
      type: 'json',
      required: true
    },
    timeLapse: {
      type: 'json',
      required: true
    }
  },

  afterCreate: async function(planner, cb) {
    MessageService.init()
    const message = await PlannerService.getPlannerMessage(planner)
    MessageService.sendMessage(JSON.stringify(message))
    cb()
  },

  afterUpdate: async function (planner, cb) {
    MessageService.init()
    const message = await PlannerService.getPlannerMessage(planner)
    MessageService.sendMessage(message)
    cb()
  }
};

