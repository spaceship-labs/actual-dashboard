(function() {
  'use strict';

  angular.module('app.configuration.ewallet', []).config(config);

  /** @ngInject */
  function config($stateProvider) {
    $stateProvider.state('app.configuration_ewallet', {
      url: '/configuration/ewallet',
      views: {
        'content@app': {
          templateUrl: 'app/main/configuration/ewallet/ewallet.html',
          controller: 'ConfigEwalletController as vm',
        },
      },
      resolve: {
        /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
      },
      moduleName: 'config-ewallet',
    });
  }
})();
