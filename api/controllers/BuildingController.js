/**
 * BuildingController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Service = {
  admin: function ( req, res ) {
    res.view('building/admin', {
      layout: 'imports/app-layout',
      user: {
        name: req.user.name || user,
        role: req.user.title === '1' ? 'ADMIN' : 'NoONE'
      }
    });
  }
}
module.exports = {
  admin: Service.admin
};

