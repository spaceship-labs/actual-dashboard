(function ()
{
    'use strict';

    angular
        .module('app.marketing.create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_create', {
            url      : '/marketing/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/marketing/create/create.html',
                    controller : 'MarketingCreateController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'create',
            moduleName: 'create-marketing',
        });
    }

})();
