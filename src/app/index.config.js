(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config(
      $httpProvider, 
      localStorageServiceProvider, 
      $urlRouterProvider,
      pikadayConfigProvider,
      ENV
    ){


      pikadayConfigProvider.setConfig({
        //minDate: new Date()
      });


      $urlRouterProvider.when('/', ['$state','$match', '$location', function ($state, $match, $location) {
        $location.path('/products');
      }]);

      localStorageServiceProvider.setPrefix(ENV.tokenPrefix + 'actualDashboard');

      //JWT TOKENS CONFIG
      $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            if ( localStorageService.get('token') ) {
              config.headers.Authorization = 'JWT ' + localStorageService.get('token');
            }
            return config;
          },
          /*
          responseError: function (response) {
            if (response.status === 401 || response.status === 403) {
              $location.path('/');
            }
            return $q.reject(response);
          }
          */
        };
      }]);

    }

})();
