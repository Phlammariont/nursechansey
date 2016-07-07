window.np = window.np || {};
window.np.login = ( function () {
  "use strict";

  var App = {
    init: function () {
      console.log("init....");
      document.getElementsByClassName("first-field-focus")[0].focus();
    }
  };

  App.init();
})();