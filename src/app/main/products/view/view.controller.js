(function ()
{
    'use strict';

    angular
        .module('app.products.view')
        .controller('ProductViewController', ProductViewController);

    /** @ngInject */
    function ProductViewController(productService, $stateParams){
        var vm = this;

        // Data

        vm.init = init;

        function init(){
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
          });
        }

        vm.init();
    }
})();
