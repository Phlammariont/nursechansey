/**
 * Created by pedro.rueda on 28/07/2017.
 */
"use strict";
//chansey-side-nav
app.directive("chanseySideNav", function (MESSAGES) {

  return {
    templateUrl: '/templates/directive/chansey-side-nav.html',
    restrict: 'E',
    replace: true,
    scope: {},
    link: function (scope) {
      scope.Msgs = MESSAGES.__;
    }
  }
});
