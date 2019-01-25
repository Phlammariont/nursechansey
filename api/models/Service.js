/**
 * Service.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'id',
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    color: {
      type: 'string',
      required: true
    },
    beds: {
      type: 'number',
    },
    bedsByNurse: {
      type: 'number',
    }
  }
};

