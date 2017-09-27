/**
 * Created by pedro.rueda on 25/07/2017.
 */
var app = angular.module('nursechansey', ['ngRoute', 'ngResource'])
  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/views/directive/user/new-user.html', {
        templateUrl: '/views/directive/user/new-user.html'
      })
      .when('/', {
        templateUrl: '/templates/view/service.html',
        controller: 'ServiceController',
        resolve: {
          services: ['serviceService', function ( serviceService ){
            return serviceService.list();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

