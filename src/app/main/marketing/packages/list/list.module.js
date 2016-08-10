(function ()
{
    'use strict';

    angular
        .module('app.marketing.packages.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_packages_list', {
            url  : '/marketing/packages',
            views: {
                'content@app': {
                    templateUrl: 'app/main/marketing/packages/list/list.html',
                    controller : 'MarketingPackagesListController as vm'
                }
            },
            resolve: {
            },
            moduleName: 'list-packages',
        });
    }

})();
