(function ()
{
    'use strict';

    angular
        .module('app.products.groups.edit')
        .controller('ProductGroupsEditController', ProductGroupsEditController);

    /** @ngInject */
    function ProductGroupsEditController($scope, $timeout, $stateParams, $q, Upload, productService, dialogService, commonService, api){
        var vm = this;
        vm.init = init;
        vm.queryProducts = queryProducts;
        vm.update = update;
        vm.selectedItemChange = selectedItemChange;
        vm.removeProductFromGroup = removeProductFromGroup;
        vm.updateIcon = updateIcon;
        vm.removeIcon = removeIcon;
        vm.onSelectStartDate = onSelectStartDate;
        vm.onSelectEndDate = onSelectEndDate;
        vm.isLoadingProducts = false;
        vm.isLoadingAvatar = false;

        vm.api = api;


        vm.types = [
          {label:'Agrupador Variaciones', handle:'variations'},
          {label:'Agrupador Ambientes', handle:'environments'},
          {label:'Agrupador Paquetes', handle:'packages'},
          {label:'Agrupador Relaciones', handle:'relations'},
        ];

        vm.init();

        //Methods

        function init(){
          vm.isLoading = true;
          productService.getGroupById($stateParams.id).then(function(res){
            vm.isLoading = false;
            console.log(res);
            vm.group = res.data;
            vm.startTime = vm.group.startDate ? new Date(angular.copy(vm.group.startDate)) : new Date();
            vm.endTime = vm.group.endDate ? new Date(angular.copy(vm.group.endDate)) : new Date();
            $timeout(function(){
              vm.myPickerEndDate.setMinDate(new Date(vm.group.startDate) );
              vm.myPickerStartDate.setMaxDate( new Date(vm.group.endDate) );
            },1000);

          });
        }

        function update(form){
          console.log('update');
          if(form.$valid && vm.group.Products.length > 0){
            vm.isLoading = true;
            if(vm.group.HasExpiration){
              vm.group.startDate = commonService.combineDateTime(vm.group.startDate,vm.startTime);
              vm.group.endDate = commonService.combineDateTime(vm.group.endDate,vm.endTime,59);
            }
            productService.updateGroup(vm.group.id, vm.group).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Agrupador actualizado');
            });
          }
          else{
            var errors = [];
            form.$error.required.forEach(function(err){
              errors.push(err.$name);
            });
            dialogService.showErrorMessage('Campos incompletos', errors);
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
              //product: item.ItemCode,
              product: item.id,
              group: vm.group.id
            };
            productService.addProductToGroup(params).then(function(res){
              vm.isLoadingProducts = false;
              vm.group.Products.push(item);
            });
          }
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

        function updateIcon($file) {
          console.log($file);
          vm.isLoadingAvatar = true;
          var updateIconMethod = '/productgroup/updateicon';

          if($file){
            vm.isLoadingAvatar = true;
            vm.uploadAvatar = Upload.upload({
              url: api.baseUrl + updateIconMethod,
              data: {
                id: vm.group.id,
                file: $file
              }
            }).then(
              function (resp) {
                console.log(resp);
                if(resp.data.icon_filename){
                  vm.group.icon_filename = resp.data.icon_filename;
                  vm.group.icon_name = resp.data.icon_name;
                  vm.group.icon_size = resp.data.icon_size;
                  vm.group.icon_type = resp.data.icon_type;
                  vm.group.icon_typebase = resp.data.icon_typebase;
                  //dialogService.showDialog('Imagen agregada');
                }else{
                  dialogService.showDialog('Error al subir archivo, intente de nuevo');
                }
                vm.isLoadingAvatar = false;
              }, 
              function (err) {
                console.log(err);
                vm.isLoadingAvatar = false;
                dialogService.showDialog('Error al subir archivo, intente de nuevo');
              }, 
              function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              }
            );
          }else{
            dialogService.showDialog('Error al subir archivo, intente de nuevo');
          }

        }

        function removeIcon(){
          var params = {id: vm.group.id};
          vm.isLoadingAvatar = true;
          productService.removeGroupIcon(params)
            .then(function(res){
              vm.isLoadingAvatar = false;
              var response = res.data;
              if(!response.icon_filename && response.id){
                vm.group.icon_filename = null;
                vm.group.icon_name = null;
                vm.group.icon_size = null;
                vm.group.icon_type = null;
                vm.group.icon_typebase = null;
                //dialogService.showDialog('Imagen eliminada');
              }else{
                $q.reject();
              }
            })
            .catch(function(err){
              console.log(err);
              vm.isLoadingAvatar = false;
              dialogService.showDialog('Hubo un error ' + (err.data || err) );
            });
        }

        function onSelectStartDate(pikaday){
          vm.group.startDate = pikaday._d;
          vm.myPickerEndDate.setMinDate(vm.group.startDate);
        }

        function onSelectEndDate(pikaday){
          vm.group.endDate = pikaday._d;
          vm.myPickerStartDate.setMaxDate(vm.group.endDate);
        }


    }
})();
