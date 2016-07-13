(function ()
{
    'use strict';

    angular
        .module('app.marketing.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_list', {
            url  : '/marketing',
            views: {
                'content@app': {
                    templateUrl: 'app/main/marketing/list/list.html',
                    controller : 'MarketingListController as vm'
                }
            },
            resolve: {
            },
            moduleName: 'list-marketing',
        });
    }

})();
