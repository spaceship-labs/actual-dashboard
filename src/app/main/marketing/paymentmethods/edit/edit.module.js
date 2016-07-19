(function ()
{
    'use strict';

    angular
        .module('app.marketing.pm.edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_pm_edit', {
            url      : '/marketing/pm/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/marketing/paymentmethods/edit/edit.html',
                    controller : 'MarketingPMEditController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'edit',
            accessList:['admin'],
            moduleName: 'edit-paymentmethods',
        });
    }

})();
