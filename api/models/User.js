/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {
  primaryKey: 'id',
  attributes: {
      id: {
        type: 'number',
        autoIncrement: true,
        unique: true
      },
      active: {
        type: 'boolean',
        required: false,
        unique: false
      },
      title: {
        type: 'json',
        required: true,
        unique: false
      },
      name: {
        type:'string',
        required: true,
        unique: false
      },
      email: {
          type: 'string',
          required: true,
          unique: true
      },
      password: {
          type: 'string',
          minLength: 6,
          required: true
      },
      services: {
        type: 'json',
        required: false
      }
  },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};
