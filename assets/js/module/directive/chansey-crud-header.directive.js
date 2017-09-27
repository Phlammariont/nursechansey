/**
 * Created by pedro.rueda on 25/07/2017.
 */
"use strict";
//chansey-crud-header
app.directive("chanseyCrudHeader", function ( MESSAGES ) {

  return {
    templateUrl: '/templates/directive/chansey-crud-header.html',
    restrict: 'E',
    replace: true,
    scope: {
      domain: "=",
      length: "=",
      showNew: "="
    },
    link: function (scope) {
      scope.Msgs = MESSAGES.__;
      scope.showAddNew = showAddNew;

      function showAddNew () {
        scope.showNew = true;
      }
    }
  }
});
