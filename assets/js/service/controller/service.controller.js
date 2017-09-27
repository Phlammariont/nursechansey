/**
 * Created by pedro.rueda on 24/07/2017.
 */
'use strict';
app.controller("ServiceController", function ( $scope, services, serviceService ) {

  init();

  $scope.showNewModel = false;
  $scope.$on("save-new-model-" + serviceService.domain.name, function () {
    $scope.servicesModel.list = serviceService.list();
  } );

  function init () {
    console.log("initing");
    $scope.servicesModel = {
      factory: serviceService.factory,
      domain: serviceService.domain,
      list: services,
      newModel: serviceService.newModel
    };
  }
});
