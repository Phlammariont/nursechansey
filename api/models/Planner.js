/**
 * Planner.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var setPlannerQueue = 'set-planner';
var getPlannerQueue = 'get-planner';

var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var open = require('amqplib').connect(url);

// Consumer
open.then(function(conn) {
  var ok = conn.createChannel();
  ok = ok.then(function(ch) {
    ch.assertQueue(getPlannerQueue);
    ch.consume(getPlannerQueue, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
  return ok;
}).then(null, console.warn);

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
    }
  },

  beforeCreate: function(planner, cb) {
    // Publisher
    open.then(function(conn) {
      var ok = conn.createChannel();
      ok = ok.then(function(ch) {
        ch.assertQueue(setPlannerQueue);
        ch.sendToQueue(setPlannerQueue, new Buffer("hola mundo!"));
      });
      return ok;
    }).then(null, console.warn);
    console.log("Sending New Planner: ", planner)
    cb()
  }
};

