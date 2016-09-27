(function ()
{
    'use strict';

    angular
        .module('app.commissions.reports', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.commissions_reports', {
            url  : '/commissions',
            views: {
                'content@app': {
                    templateUrl: 'app/main/commissions/reports/reports.html',
                    controller : 'CommissionsReportsController as vm'
                }
            },
            resolve: {
                /*commissions: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'reports-commissions',
        });
    }

})();
