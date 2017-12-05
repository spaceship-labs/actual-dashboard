(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('zipcodeService', zipcodeService);

    /** @ngInject */
    function zipcodeService($http, $q, api){

      var service = {
        getZipcodeStates: getZipcodeStates,
        updateZipcodeStates: updateZipcodeStates
      };

      return service;

      function getZipcodeStates(){
        var url = '/zipcodestates';
        return api.$http.get(url).then(function(res){
          return res.data;
        });
      }

      function updateZipcodeStates(params){
        var url = '/zipcodestates/multipleupdate';
        console.log('params updateZipcodeStates', params );
        return api.$http.post(url, params).then(function(res){
          return res.data;
        });        
      }

    }


})();
