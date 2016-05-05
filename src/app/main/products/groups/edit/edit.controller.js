(function ()
{
    'use strict';

    angular
        .module('app.products.groups.edit')
        .controller('ProductGroupsEditController', ProductGroupsEditController);

    /** @ngInject */
    function ProductGroupsEditController($scope, $stateParams, $q ,productService, dialogService, commonService){
        var vm = this;
        vm.init = init;
        vm.queryProducts = queryProducts;
        vm.update = update;
        vm.selectedItemChange = selectedItemChange;
        vm.removeProductFromGroup = removeProductFromGroup;
        vm.isLoadingProducts = false;

        vm.types = [
          {label:'Agrupador Variaciones', handle:'variations'},
          {label:'Agrupador Ambientes', handle:'environments'},
          {label:'Agrupador Paquetes', handle:'packages'},
          {label:'Agrupador Relaciones', handle:'relations'},
        ];

        vm.init();

        //Methods

        function init(){
          productService.getGroupById($stateParams.id).then(function(res){
            console.log(res);
            vm.group = res.data;
          });
        }

        function update(form){
          console.log('update');
          if(form.$valid && vm.group.Products.length > 0){
            vm.isLoading = true;
            productService.updateGroup(vm.group.id, vm.group).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Agrupador actualizado');
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
            vm.selectedProduct = null;
            vm.searchText = null;
            vm.isLoadingProducts = true;
            var params = {
              product: item.ItemCode,
              group: vm.group.id
            };
            productService.addProductToGroup(params).then(function(res){
              vm.isLoadingProducts = false;
              vm.group.Products.push(item);
            });
            //$mdAutocomplete.clear();
          }
          //vm.selectedProduct = undefined;
          //vm.searchText = '';
        }

        function removeProductFromGroup(id, index){
          vm.isLoadingProducts = true;
          var params = {
            product: id,
            group: vm.group.id
          };
          productService.removeProductFromGroup(params).then(function(res){
            console.log(res);
            vm.group.Products.splice(index, 1);
            vm.isLoadingProducts = false;
          });
        }

    }
})();
