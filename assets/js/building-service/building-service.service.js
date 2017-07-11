/**
 * Created by pedro.rueda on 31/03/17.
 */
angular.module('user')
  .service('BuildingServiceService', function ( NurseApi, MESSAGES ){

    var Model = {
      services: []
    };

    var Service = {
      fetch: function ( callback ) {
        NurseApi
          .fetchServices()
          .then(function ( response ) {
            Model.services = response.data;
            callback( Model.services );
          })
      },
      getServices: function ( ids ) {
        var services = [];
        for (var id in ids) {
          var service = Model.services.find(function (item) {
            return item.id == id;
          });
          if ( !!service ) services.push( service );
        }

        return services;
      },
      getService: function (id) {
        var service = Model.services.find(function (item) {
          return item.id == id;
        });
        return service || {};
      }
    };

    return {
      init: Service.fetch,
      getServices: Service.getServices,
      getService: Service.getService,
      services: Model.services
    }
  });

