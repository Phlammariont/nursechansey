var app = angular.module('user', []);

app.controller('userController', function ($scope){
  $scope.showAddUserClass = "is-hide";
  $scope.showAddUser = function () {
    $scope.showAddUserClass = "";
  }
  $scope.titles = [
    {id:0,name:"Enfermera Jefe"},
    {id:1,name:"Enfermera Auxiliar"}
  ]
  $scope.users =[
    {
      name:'Leon Rueda',
      title:'Enfermero Jefe SSr',
      status: true,
      services: ['urgencias', 'cuidados intensivos']
    },
    {
      name:'Irina Rueda',
      title:'Enfermera Jefe SSr',
      status: true,
      services: ['urgencias', 'cuidados intensivos']
    },
    {
      name:'Leon Rueda',
      title:'Enfermero Jefe',
      status: true,
      services: ['urgencias', 'cuidados intensivos']
    },
    {
      name:'Irina Rueda',
      title:'Enfermera Auxiliar',
      status: true,
      services: ['urgencias', 'cuidados intensivos']
    }
  ];
});