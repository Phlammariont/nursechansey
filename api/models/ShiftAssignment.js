/**
 * ShiftAssignment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    serviceId: {
      type: 'string',
      required: true,
      unique: true
    },
    assignment: {
      type: 'json',
      required: true,
      unique: false
    }
  }
};

