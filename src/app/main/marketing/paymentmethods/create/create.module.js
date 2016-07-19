(function ()
{
    'use strict';

    angular
        .module('app.marketing.pm.create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_pm_create', {
            url      : '/marketing/pm/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/marketing/paymentmethods/create/create.html',
                    controller : 'MarketingPMCreateController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'create',
            moduleName: 'create-paymentmethods',
        });
    }

})();
