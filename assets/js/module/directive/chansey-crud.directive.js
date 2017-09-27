/**
 * Created by pedro.rueda on 24/07/2017.
 */
app.directive('chanseyCrud', function ( MESSAGES ) {
    return {
      templateUrl: '/templates/directive/chansey-crud.html',
      restrict: 'E',
      replace: true,
      scope: {
        model: "=",
        showNew: "="
      },
      link: function (scope) {
        scope.Msgs = MESSAGES.__;
        scope.edit = edit;
        scope.deleteItem = deleteItem;
        var factory = scope.model.factory;

        console.log(scope.model, scope.model.factory);
        function deleteItem( item ) {
          item.$delete().then( () => {
            scope.$emit("save-new-model-" + scope.model.domain.name);
          });
        }
        function edit( item ) {
          scope.showNew = true;
          scope.model.newModel = item;
        }
      }
    };
  });

