/**
 * Created by pedro.rueda on 1/12/16.
 */
angular.module('user')
  .directive('newUserForm', function ( MESSAGES, UserService ) {
    return {
      templateUrl: '/views/directive/user/new-user.html',
      restrict: 'E',
      replace: true,
      scope: {
        newUser: "=",
        services: "=",
        titles: "="
      },
      link: function (scope) {
        scope.Msgs = MESSAGES.__;
        scope.saveUser = saveUser;
        function saveUser( e ) {
          e.preventDefault();
          if ( scope.newUser.id ) {
            UserService.update(scope.newUser).then(function () {
              UserService.init();
            })
          } else {
            UserService.save(scope.newUser).then(function () {
              UserService.init();
            });
          }
        }
      }
    };
  });
