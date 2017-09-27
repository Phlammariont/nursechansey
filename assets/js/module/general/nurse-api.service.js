/**
 * Created by pedro.rueda on 30/03/17.
 */
"use strict";
const endpoint = {
  user: '/user',
  title: '/title',
  service: '/service'
};
app.service('NurseApi', function ( $http ){

    var Service = {
      saveUser: function( user ) {
        return $http.post( endpoint.user, JSON.stringify( user ) );
      },
      updateUser: function( user ) {
        return $http.put( endpoint.user + '/' + user.id, JSON.stringify( user ) );
      },
      deleteUser: function( user ) {
        return $http.delete( endpoint.user + '/' + user.id );
      },
      fetchUsers: function () {
        return $http.get( endpoint.user );
      },
      fetchTitles: function () {
        return $http.get( endpoint.title )
      },
      fetchServices: function () {
        return $http.get( endpoint.service );
      }
    };

    return {
      saveUser: Service.saveUser,
      updateUser: Service.updateUser,
      deleteUser: Service.deleteUser,
      fetchUsers: Service.fetchUsers,
      fetchTitles: Service.fetchTitles,
      fetchServices: Service.fetchServices
    }
  });


