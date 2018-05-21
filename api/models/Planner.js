/**
 * Planner.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

// const setPlannerQueue = 'set-planner';
// const getPlannerQueue = 'get-planner';
//
// const url = process.env.CLOUDAMQP_URL || "amqp://localhost";
// const open = require('amqplib').connect(url);
//
// // Consumer
// open.then(function(conn) {
//   var ok = conn.createChannel();
//   ok = ok.then(function(ch) {
//     ch.assertQueue(getPlannerQueue);
//     ch.consume(getPlannerQueue, function(msg) {
//       if (msg !== null) {
//         console.log(msg.content.toString());
//         ch.ack(msg);
//       }
//     });
//   });
//   return ok;
// }).then(null, console.warn);

const sendMessage = (planner) => {
  // Publisher
  //open.then(function(conn) {
  //   let ok = conn.createChannel();
  //   ok = ok.then(function(ch) {
  //     ch.assertQueue(setPlannerQueue);
  //     ch.sendToQueue(setPlannerQueue, new Buffer(JSON.stringify(planner)), {contentType: 'application/json'});
  //   });
  //   return ok;
  // }).then(null, console.warn);
  console.log("Sending New Planner: ", planner)
}



module.exports = {
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
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

  beforeCreate: async function(planner, cb) {
    sendMessage(await PlannerService.getPlannerMessage(planner))
    cb()
  }
};

