'use strict';
var app = angular.module('user', ['ngRoute'])
  .config(['$routeProvider',function ($routeProvider) {

    $routeProvider
      .when('/views/directive/user/new-user.html', {
        templateUrl: '/views/directive/user/new-user.html'
      })
  }]);

angular.module('user')
  .controller('userController', function ($scope, UserService, RoleService, BuildingServiceService) {

    RoleService.init(function (titles) {
      $scope.titles = titles
    });
    BuildingServiceService.init(function (services) {
      $scope.services = services;
    });

    $scope.showAddUserClass = "is-hide";//is-hide
    $scope.showAddUser = showAddUser;
    $scope.getTitle = RoleService.getTitle;
    $scope.getServices = BuildingServiceService.getServices;
    $scope.edit = edit;
    $scope.delete = deleteUser;
    $scope.model = UserService.model;

    function edit ( user ) {
      $scope.newUser = user;
      showAddUser();
    }

    function deleteUser( user ) {
      UserService.deleteUser( user ).then(function (response) {
        UserService.init();
      });
    }

    function showAddUser() {
      $scope.showAddUserClass = "";
    }

    UserService.init();
});
