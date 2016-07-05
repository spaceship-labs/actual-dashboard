(function ()
{
    'use strict';

    angular
        .module('app.products.filters.create')
        .controller('ProductFiltersEditController', ProductFiltersEditController);

    /** @ngInject */
    function ProductFiltersEditController($scope, $stateParams, $mdMedia, $mdDialog ,productService, dialogService, commonService){
        var vm = this;
        vm.init = init;
        vm.newFilterValue = newFilterValue;
        vm.update = update;
        vm.loadCategories = loadCategories;
        vm.formatCategoryGroups = formatCategoryGroups;
        vm.groupSelectedCategories = groupSelectedCategories;
        vm.openValueForm = openValueForm;
        vm.sortValues = sortValues;
        vm.getValuesOrder = getValuesOrder;
        vm.addValue = addValue;
        vm.removeValue = removeValue;
        vm.editValue = editValue;
        vm.showDestroyDialog = showDestroyDialog;

        vm.isLoading = false;
        vm.isLoadingValues = false;
        vm.destroyFn = productService.destroyFilterById;
        vm.selectedValue = false;

        vm.selectedCategories = [];

        vm.init();

        //Methods
        function cancel(){
          $mdDialog.cancel();
        }


        function init(){
          productService.getFilterById($stateParams.id).then(function(res){
            console.log(res);
            vm.filter = res.data;
            vm.loadCategories();
            vm.sortValues();
          });
        }

        function sortValues(){
          //var idsList = [93,92,94,95];
          console.log(vm.filter.Values);
          if(vm.filter.ValuesOrder){
            var idsList = vm.filter.ValuesOrder.split(',');
            console.log(idsList);
            if(idsList.length > 0 && vm.filter.ValuesOrder){
              var baseArr = angular.copy(vm.filter.Values);
              var newArr = [];
              idsList.forEach(function(id){
                baseArr.forEach(function(val){
                  if(val.id == id){
                    newArr.push(val);
                  }
                })
              });

              //If values are not in the order list
              vm.filter.Values.forEach(function(val){
                if( idsList.indexOf(val.id) < 0 ){
                  console.log('No estaba en la lista : ' + val.Name);
                  newArr.push(val);
                }
              });

              console.log(newArr);
              //Fixes values order missmatch
              if(newArr.length > 0){
                vm.filter.Values = newArr;
              }
            }


          }
        }

        function update(form){
          //if(form.$valid && vm.filter.Values.length > 0){
          console.log(form);
          if(form.$valid){
            vm.isLoading = true;
            vm.groupSelectedCategories();
            vm.getValuesOrder();
            var params = angular.copy(vm.filter);
            delete params.Values;
            productService.updateFilterById(vm.filter.id, params).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Filtro actualizado');
              $mdDialog.hide();
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

        function getValuesOrder(){
          vm.filter.ValuesOrder =  [];
          var auxValues = [];
          vm.filter.Values.forEach(function(val){
            if(auxValues.indexOf(val) < 0){
              auxValues.push(val);
              vm.filter.ValuesOrder.push(val.id);
            }
          });
        }

        function showDestroyDialog($ev){
          dialogService.showDestroyDialog($ev, vm.destroyFn, vm.filter.id, '/products/filters');
        }

        function newFilterValue(chip) {
          return {
            Name: chip,
            Handle: commonService.formatHandle(chip)
          };
        }

        function groupSelectedCategories(){
          vm.filter.Categories = [];
          for(var i=0; i<vm.categoriesGroups.length; i++){
            console.log('selectedCategories'+i , vm.selectedCategories[i]);
            vm.filter.Categories = vm.filter.Categories.concat(vm.selectedCategories[i]);
          }
          console.log(vm.filter.Categories);
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            console.log(res);
            vm.categoriesGroups = res.data;
            vm.formatCategoryGroups();
          });
        }

        function formatCategoryGroups(){
          for(var i=0;i<vm.categoriesGroups.length;i++){
            vm.selectedCategories[i] = [];
            for(var j=0;j<vm.filter.Categories.length;j++){
              vm.categoriesGroups[i] = vm.categoriesGroups[i].map(function(category){
                if(vm.filter.Categories[j].id == category.id){
                  vm.selectedCategories[i].push(category.id);
                }
                return category;
              });
            }
          }
        }

        function addValue(value){
          console.log(vm.filter.Values);
          vm.isLoadingValues = true;
          value.Filter = vm.filter.id;
          productService.createFilterValue(value).then(function(res){
            console.log(res);
            vm.filter.Values.push(res.data);
            vm.isLoadingValues = false;
          });
        }

        function editValue(newData, value){
          console.log(value);
          vm.isLoadingValues = true;
          productService.updateFilterValue(value.id, newData).then(function(res){
            console.log(res);
            value = res.data;
            vm.isLoadingValues = false;
          });
        }

        function removeValue($ev,valueId, valueIndex){
          var hasRedirect = false;
          var isPromise = true;
          console.log('empezo removeValue');
          dialogService.showDestroyDialog(
            $ev,
            productService.destroyFilterValue,
            valueId,
            hasRedirect,
            isPromise,
            vm.isLoadingValues
          ).then(function(res){
            console.log(res);
            vm.filter.Values.splice(valueIndex, 1);
          });
        }

        function openValueForm(ev, action, value) {
          console.log('createValue');
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          var params = {
            value: value,
            action: action
          };
          $mdDialog.show({
            controller: ValueFormController,
            templateUrl: 'app/main/products/filters/value-form.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
            locals: params
          })
          .then(function(newData) {
            if(action === 'add'){
              vm.addValue(newData);
            }
            else if(action === 'edit'){
              vm.editValue(newData, value);
            }
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
        };



        function ValueFormController($scope, commonService, value, action){
          $scope.value = value || {};
          $scope.action = action || 'add';
          $scope.actionLabel = 'Crear';
          if($scope.action === 'edit'){
            $scope.actionLabel = 'Editar';
          }
          $scope.cancel = function(){ $mdDialog.cancel(); };
          $scope.submit = function(value){ $mdDialog.hide(value); };

          $scope.$watch('value.Name', function(newVal, oldVal){
            if(newVal != oldVal && $scope.action === 'add'){
              $scope.value.Handle = commonService.formatHandle(newVal);
            }
          });

        }

    }
})();
