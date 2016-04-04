(function ()
{
    'use strict';

    angular
        .module('app.products.categories.create')
        .controller('ProductCategoriesCreateController', ProductCategoriesCreateController);

    /** @ngInject */
    function ProductCategoriesCreateController($mdDialog, $stateParams, productService,Upload, api, $http){
        var vm = this;

        vm.init = init;
        vm.category = {};

        vm.init();

        //Methods

        function init(){
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
          });
        }

    }
})();
