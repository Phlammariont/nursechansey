/**
 * Created by pedro.rueda on 1/12/16.
 */
angular.module('user')
  .directive('npSelect', function ($timeout, BuildingServiceService) {
    return {
      templateUrl: '/views/directive/general/np-select.html',
      restrict: 'E',
      replace: true,
      scope: {
        options: '=',
        selectedItems: '=ngModel',
        type: '<?type'
      },
      link: function (scope, element) {
        scope.selectedItemsShow = BuildingServiceService.getServices(scope.selectedItems) || [];
        scope.getService = BuildingServiceService.getService;
        var $input = $("#txt-services");
        $input.typeahead({
            hint: true,
            highlight: true,
            minLength: 1,
            displayKey: 'name'
          },
          {
            name: 'states',
            source: substringMatcher(scope.options),
            display: function (item) {
              return item.name;
            },
            templates: {
              empty: [
                '<div class="empty-message np-select-option">',
                'No hay items que cumplan con este criterio',
                '</div>'
              ].join('\n'),
              suggestion: function (item) {
                return "<div class='np-select-option'>" + item.name + "</div>"
              }
            }
          });
        $input.on('typeahead:selected', function(evt, item) {
          // do what you want with the item here
          scope.selectedItems = scope.selectedItems || [];
          $timeout( function () {
            !!scope.type ? scope.selectedItems.push(item[scope.type]) : scope.selectedItems.push(item);
            scope.selectedItemsShow.push(item)
            scope.value = '';
          });
        });

        scope.delete = deleteOption;

        function deleteOption ( id ) {
          scope.selectedItems.splice(scope.selectedItems.indexOf(id), 1);
          scope.selectedItemsShow.splice(scope.selectedItemsShow.indexOf(id), 1);
        }
      }
    };
  });

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    var substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str.name)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};


