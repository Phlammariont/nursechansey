/**
* Created with phlammariont-chansey.
* User: Phlammariont
* Date: 2016-06-17
* Time: 09:09 PM
* To change this template use Tools | Templates.
*/
module.exports = {

  main: function ( req, res ) {
    res.view('dashboard/main', {
      layout: 'imports/app-layout',
      user: req.session.user
    });
  }
};