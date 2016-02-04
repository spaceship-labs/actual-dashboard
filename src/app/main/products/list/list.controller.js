(function ()
{
    'use strict';

    angular
        .module('app.products.list')
        .controller('ProductsListController', ProductsListController);

    /** @ngInject */
    function ProductsListController(Employees)
    {
        var vm = this;

        // Data
        vm.employees = Employees.data;

        // Methods

        //////////
    }

})();
