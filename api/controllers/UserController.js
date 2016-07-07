/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	admin: function ( req, res ) {
     res.view('user/admin', {
      layout: 'imports/app-layout',
      user: {
        name: 'leon rueda',
        role: 'ADMIN'
      }
    });
  }
};

