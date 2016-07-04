(function ()
{
    'use strict';

    angular
        .module('app.leads.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.leads_list', {
            url  : '/leads',
            views: {
                'content@app': {
                    templateUrl: 'app/main/leads/list/list.html',
                    controller : 'LeadsListController as vm'
                }
            },
            resolve: {
                /*leads: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-leads',
        });
    }

})();
