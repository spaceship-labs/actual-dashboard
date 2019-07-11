(function() {
  'use strict';

  angular.module('app.configuration.ewalletreplacement', []).config(config);

  /** @ngInject */
  function config($stateProvider) {
    $stateProvider.state('app.configuration_ewallet_replacement', {
      url: '/configuration/ewallet-replacement',
      views: {
        'content@app': {
          templateUrl:
            'app/main/configuration/ewalletreplacement/ewallet-replacement.html',
          controller: 'ConfigEwalletReplacementController as vm',
        },
      },
      resolve: {
        /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
      },
      moduleName: 'config-ewallet-replacement',
    });
  }
})();
