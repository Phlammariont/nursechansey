var app = angular.module('user', []);

app.controller('userController', function ($scope){
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