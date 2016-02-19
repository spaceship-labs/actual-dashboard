(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('ProductViewController', ProductViewController);

    /** @ngInject */
    function ProductViewController($mdDialog, Product){
        var vm = this;

        // Data
        console.log(Product);
        vm.product = Product.data;
    }
})();
