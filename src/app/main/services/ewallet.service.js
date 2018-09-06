(function() {
  'use strict';

  angular.module('app.services').factory('ewalletService', ewalletService);

  /** @ngInject */
  function ewalletService($http, localStorageService, api) {
    var service = {
      update: update,
      find: find,
      create: create,
    };

    return service;

    function create(params) {
      var url = '/ewalletconfiguration';
      return api.$http.post(url, params);
    }

    function update(id, params) {
      var url = '/ewalletconfiguration/' + id;
      return api.$http.post(url, params);
    }

    function find() {
      var url = '/ewalletconfiguration/';
      return api.$http.get(url);
    }
  }
})();
