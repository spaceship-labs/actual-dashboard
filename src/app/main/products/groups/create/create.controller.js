(function ()
{
    'use strict';

    angular
        .module('app.products.groups.create')
        .controller('ProductGroupsCreateController', ProductGroupsCreateController);

    /** @ngInject */
    function ProductGroupsCreateController($scope, $location, $q, productService, dialogService, commonService ){
        var vm = this;
        vm.init = init;
        vm.create = create;
        vm.queryProducts = queryProducts;
        vm.selectedItemChange = selectedItemChange;
        vm.removeProductFromGroup = removeProductFromGroup;
        vm.isLoading = false;

        vm.group = {
          Products:[]
        };

        vm.types = [
          {label:'Agrupador Variaciones', handle:'variations'},
          {label:'Agrupador Ambientes', handle:'environments'},
          {label:'Agrupador Paquetes', handle:'packages'},
          {label:'Agrupador Relaciones', handle:'relations'},

        ];

        vm.init();

        //Methods

        function init(){
          moment.locale('es');
        }

        function create(form){
          //if(form.$valid && vm.group.Products.length > 0){
          if(form.$valid){
            vm.isLoading = true;
            productService.createGroup(vm.group).then(function(res){
              vm.isLoading = false;
              dialogService.showDialog('Agrupador creado');
              $location.path('/products/groups');
            });
          }
          else{
            dialogService.showDialog('Campos incompletos');
          }
        }

        function queryProducts(term){
          console.log(term);
          if(term != '' && term){
            var deferred = $q.defer();
            var params = {term: term, autocomplete: true};
            productService.search(params).then(function(res){
              console.log(res);
              deferred.resolve(res.data.data);
            });
            return deferred.promise;
          }
          else{
            return [];
          }
        }

        function selectedItemChange(item){
          if(item && item.ItemCode){
            vm.group.Products.push(item);
            vm.selectedProduct = null;
            vm.searchText = null;
            //$mdAutocomplete.clear();
          }
          //vm.selectedProduct = undefined;
          //vm.searchText = '';
        }

        function removeProductFromGroup(index){
          vm.group.Products.splice(index, 1);
        }

        $scope.$watch('vm.group.Name', function(newVal, oldVal){
          if(newVal != oldVal){
            vm.group.Handle = commonService.formatHandle(newVal);
          }
        });


    }
})();
