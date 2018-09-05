(function() {
  'use strict';

  angular.module('app.services').factory('ewalletService', ewalletService);

  /** @ngInject */
  function ewalletService($http, localStorageService, api) {
    var service = {
      update: update,
      find: find,
    };

    return service;

    function update(id, params) {
      var url = '/ewalletconfiguration/' + id;
      return api.$http.post(url, params);
    }

    function find(id) {
      var url = '/ewalletconfiguration/' + id;
      return api.$http.get(url);
    }
  }
})();
