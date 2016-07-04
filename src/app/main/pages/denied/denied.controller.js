(function ()
{
    'use strict';

    angular
        .module('app.accesdenied')
        .controller('AccessDeniedController', AccessDeniedController);

    /** @ngInject */
    function AccessDeniedController(api, userService)
    {
        var vm = this;
    }

})();
