(function ()
{
    'use strict';

    angular
        .module('app.marketing.slowmovement', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_slowmovement', {
            url      : '/marketing/slowmovement',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/marketing/slowmovement/slowmovement.html',
                    controller : 'MarketingSlowMovementController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'slowmovement',
            moduleName: 'slowmovement-marketing',
        });
    }

})();
