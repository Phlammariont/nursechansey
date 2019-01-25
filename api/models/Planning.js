/**
 * Planning.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
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
    }
  }

};

