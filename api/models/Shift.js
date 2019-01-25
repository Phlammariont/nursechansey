/**
 * Shift.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'string',
      unique: true
    },
    plannerId: {
      type:'string',
      required: true
    },
    date: {
      type:'string',
      required: true,
      unique: false
    },
    service: {
      type: 'json'
    },
    shiftType: {
      type: 'json'
    }
  }
};

