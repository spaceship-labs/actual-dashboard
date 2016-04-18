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
        vm.addValue = addValue;
        vm.removeValue = removeValue;
        vm.editValue = editValue;
        vm.isLoading = false;
        vm.isLoadingValues = false;

        vm.init();

        //Methods

        function init(){
          productService.getFilterById($stateParams.id).then(function(res){
            console.log(res);
            vm.filter = res.data;
            vm.loadCategories();
          });
        }

        function update(form){
          if(form.$valid && vm.filter.Values.length > 0){
            vm.isLoading = true;
            vm.groupSelectedCategories();
            productService.updateFilterById(vm.filter.id, vm.filter).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Filtro actualizado');
            });
          }
          else{
            dialogService.showDialog('Campos incompletos');
          }
        }

        function newFilterValue(chip) {
          return {
            Name: chip,
            Handle: commonService.formatHandle(chip)
          };
        }

        function groupSelectedCategories(){
          vm.filter.Categories = [];
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.categoriesGroups[i].length;j++){
              if(vm.categoriesGroups[i][j].selected){
                vm.filter.Categories.push(vm.categoriesGroups[i][j]);
              }
            }
          }
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            vm.categoriesGroups = res.data;
            vm.formatCategoryGroups();
          });
        }

        function formatCategoryGroups(){
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.filter.Categories.length;j++){
              vm.categoriesGroups[i] = vm.categoriesGroups[i].map(function(category){
                if(vm.filter.Categories[j].id == category.id){
                  category.selected = true;
                }
                return category;
              });
            }
          }
        }


        $scope.$watch('vm.filter.Name', function(newVal, oldVal){
          if(newVal != oldVal && newVal != ''){
            vm.filter.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            vm.filter.Handle = commonService.formatHandle(vm.filter.Handle);
          }
        });

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
          })
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
            if(newVal != oldVal){
              $scope.value.Handle = commonService.formatHandle(newVal);
            }
          });
        }

    }
})();
