'use strict';

/**
 * @ngdoc service
 * @name comafiApp.MESSAGES
 * @description
 * # MESSAGES
 * Service in the comafiApp.
 */
app.service('MESSAGES', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function getkey(key) {
      if (!Messages.hasOwnProperty(key)) return key;
      return Messages[key];
    }

    return {
      __: getkey
    };
  });

var Messages = {
  'Name': 'Nombre'
};
