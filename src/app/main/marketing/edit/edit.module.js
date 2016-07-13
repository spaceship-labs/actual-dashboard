(function ()
{
    'use strict';

    angular
        .module('app.marketing.edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.marketing_edit', {
            url      : '/marketing/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/marketing/edit/edit.html',
                    controller : 'MarketingEditController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'edit',
            accessList:['admin'],
            moduleName: 'edit-marketing',
        });
    }

})();
