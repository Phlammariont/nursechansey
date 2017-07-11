/**
 * Created by pedro.rueda on 30/03/17.
 */
angular.module('user')
  .service('UserService', function ( NurseApi ){
    var Model = {
      users: []
    };
    var Service = {
      save: function( user ) {
        return new Promise (function (resolve, reject) {
          NurseApi.saveUser( user ).then( function ( response ) {
              resolve(response);
          }).catch(reject);
        });
      },
      update: function( user ) {
        return new Promise (function (resolve, reject) {
          NurseApi.updateUser(user).then(function (response) {
            resolve(response);
          }).catch(reject);
        });
      },
      deleteUser: function ( user ) {
        return new Promise ( function (resolve, reject ) {
          NurseApi.deleteUser( user ).then( function ( response ) {
            resolve(response);
          }).catch(reject);
        });
      },
      fetch: function ( callback ) {
          NurseApi
            .fetchUsers()
            .then(function ( response ) {
              Model.users = response.data;
              if ( callback ) callback();
            }).catch()
      }
    };

    return {
      save: Service.save,
      update: Service.update,
      deleteUser: Service.deleteUser,
      model: Model,
      init: Service.fetch
    }
  });
