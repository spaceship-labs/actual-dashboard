(function ()
{
    'use strict';

    angular
        .module('app.invoices.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.invoices_list', {
            url  : '/invoices',
            views: {
                'content@app': {
                    templateUrl: 'app/main/invoices/list/list.html',
                    controller : 'InvoicesListController as vm'
                }
            },
            resolve: {
                /*invoices: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-invoices',
        });
    }

})();
