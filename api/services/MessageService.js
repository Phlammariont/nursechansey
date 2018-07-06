
const setPlannerQueue = 'set-planner';
const getPlannerQueue = 'get-planner';

const url = process.env.CLOUDAMQP_URL || "amqp://localhost";
const open = require('amqplib').connect(url);

const init = () => {
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
}

const sendMessage = (planner) => {
  //Publisher
  open.then(function(conn) {
    let ok = conn.createChannel();
    ok = ok.then(function(ch) {
      ch.assertQueue(setPlannerQueue);
      ch.sendToQueue(setPlannerQueue, new Buffer(JSON.stringify(planner)), {contentType: 'application/json'});
    });
    return ok;
  }).then(null, console.warn);
  console.log("Sending New Planner: ", planner)
}



module.exports = {
  init,
  sendMessage
}
