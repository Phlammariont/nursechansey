/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Service = {
  admin: function ( req, res ) {
    res.view('service/admin', {
      layout: 'imports/app-layout',
      user: {
        name: 'leon rueda',
        role: 'ADMIN'
      }
    });
  }
}
module.exports = {
	admin: Service.admin
};

