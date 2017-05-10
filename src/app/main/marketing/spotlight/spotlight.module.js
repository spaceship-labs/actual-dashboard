(function ()
{
    'use strict';

    angular
        .module('app.marketing.spotlight', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_spotlight', {
            url      : '/marketing/spotlight',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/marketing/spotlight/spotlight.html',
                    controller : 'MarketingSpotlightController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'spotlight',
            moduleName: 'spotlight-marketing',
        });
    }

})();
