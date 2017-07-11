/**
 * Created by pedro.rueda on 30/03/17.
 */
angular.module('user')
  .service('RoleService', function ( NurseApi, MESSAGES ){

    var Model = {
      titles: []
    };

    var Service = {
      fetch: function ( callback ) {
        NurseApi
          .fetchTitles()
          .then(function ( response ) {
            Model.titles = response.data;
            callback( Model.titles )
          })
      },
      getTitle: function ( id ) {
        var title = Model.titles.find(function (item) {
          return item.id == id;
        }) || {};

        return title.name || MESSAGES.__("N-A")
      }
    };

    return {
      init: Service.fetch,
      getTitle: Service.getTitle,
      titles: Model.titles
    }
  });
