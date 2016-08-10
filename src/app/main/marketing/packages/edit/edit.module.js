(function ()
{
    'use strict';

    angular
        .module('app.marketing.packages.edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_package_edit', {
            url      : '/marketing/packages/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/marketing/packages/edit/edit.html',
                    controller : 'MarketingPackagesditController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'edit',
            accessList:['admin'],
            moduleName: 'edit-packages',
        });
    }

})();
