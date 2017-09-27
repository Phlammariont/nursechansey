/**
 * Created by pedro.rueda on 25/07/2017.
 */
"use strict";
//
app.service( "serviceService", function ( MESSAGES, $resource ) {
  var newModel = {
    name: "",
    color: ""
  };
  var model = {
    factory: $resource('/service/:id', {id:'@id'}),
    defaults: {
      name: MESSAGES.__("Services"),
      attributes: [
        { index: "name", label: "Name", type: "String", defaultValue: "", weight: 3},
        { index: "id", type: "Number", defaultValue: 0, hidden: true},
        { index: "color", label: "Color", type: "String", defaultValue: "", weight: 3, formatter: colorFormatter}
      ]
    }
  };

  var service = {
    list: function () {
      return model.factory.query();
    }
  };

  return {
    factory: model.factory,
    list: service.list,
    domain: model.defaults,
    newModel: newModel
  };

  function colorFormatter ( colorString ) {
    var element = '<i class="material-icons" style="color: ' + colorString + '">local_hospital</i>';
    return element;
  }
});

app.filter('trusted', function($sce){
    return function(html){
      return typeof html === "string" ? $sce.trustAsHtml(html): '';
    }
  });
