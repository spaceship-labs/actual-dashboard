(function ()
{
    'use strict';

    angular
        .module('app.marketing.pm.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_pm_list', {
            url  : '/marketing/pm',
            views: {
                'content@app': {
                    templateUrl: 'app/main/marketing/paymentmethods/list/list.html',
                    controller : 'MarketingPMListController as vm'
                }
            },
            resolve: {
            },
            moduleName: 'list-paymentmethods',
        });
    }

})();
