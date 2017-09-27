/**
 * Created by pedro.rueda on 11/08/2017.
 */
"use strict";
//chansey-crud-header
app.directive("chanseyNewModel", function ( MESSAGES ) {

  return {
    templateUrl: '/templates/directive/chansey-new-model.html',
    restrict: 'E',
    replace: true,
    scope: {
      factory: "=",
      ngShow: "="
    },
    link: function (scope) {

      scope.domain = scope.factory.domain;
      scope.resource = scope.factory.factory; // resource should be a resource instance of the model.
      scope.Msgs = MESSAGES.__;
      scope.attributes = scope.domain.attributes;
      scope.$watch('factory.newModel', function () {
        scope.actualEditModel = scope.factory.newModel;
      });
      scope.saveModel = saveModel;
      scope.cancel = cancel;
      function saveModel () {
        var res = new scope.resource( scope.actualEditModel );
        res.$save().then(function () {
          scope.$emit("save-new-model-" + scope.domain.name);
        });
      }
      function cancel() {
        scope.ngShow = false;
      }
    }
  }
});

