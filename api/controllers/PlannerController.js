/**
 * PlannerController
 *
 * @description :: Server-side logic for managing planners
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  clearQueue: function ( req, res ) {

    console.log("to clean the queue... ")
    var setPlannerQueue = 'set-planner';
    var getPlannerQueue = 'get-planner';

    var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
    var open = require('amqplib').connect(url);

// Consumer
    open.then(function(conn) {
      var ok = conn.createChannel();
      ok = ok.then(function(ch) {
        ch.assertQueue(getPlannerQueue);
        ch.consume(req.param('queue'), function(msg) {
          if (msg !== null) {
            res.send(msg.content.toString());
            ch.ack(msg);
          }
        });
      });
      return ok;
    }).then(null, console.warn);
  }
};

