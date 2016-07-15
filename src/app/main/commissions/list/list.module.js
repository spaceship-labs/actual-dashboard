(function ()
{
    'use strict';

    angular
        .module('app.commissions.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.commissions_list', {
            url  : '/commissions',
            views: {
                'content@app': {
                    templateUrl: 'app/main/commissions/list/list.html',
                    controller : 'CommissionsListController as vm'
                }
            },
            resolve: {
                /*commissions: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-commissions',
        });
    }

})();
