(function ()
{
    'use strict';

    angular
        .module('app.products.filters.create')
        .controller('ProductFiltersCreateController', ProductFiltersCreateController);

    /** @ngInject */
    function ProductFiltersCreateController($scope, $location, $mdDialog, $mdMedia ,productService, dialogService, commonService){
        var vm = this;
        vm.init = init;
        vm.create = create;
        vm.isLoading = false;
        vm.loadCategories = loadCategories;
        vm.groupSelectedCategories = groupSelectedCategories;
        vm.openValueForm = openValueForm;
        vm.addValue = addValue;
        vm.removeValue = removeValue;
        vm.editValue = editValue;

        vm.filter = {
          Values:[]
        };

        vm.init();

        //Methods

        function init(){
          vm.loadCategories();
        }

        function create(form){
          if(form.$valid && vm.filter.Values.length > 0){
            vm.isLoading = true;
            vm.groupSelectedCategories();
            productService.createFilter(vm.filter).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Filtro creado');
              $location.path('/products/filters');
            });
          }
          else{
            dialogService.showDialog('Campos incompletos');
          }
        }

        function groupSelectedCategories(){
          vm.filter.Categories = [];
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.categoriesGroups[i].length;j++){
              if(vm.categoriesGroups[i][j].selected){
                vm.filter.Categories.push(vm.categoriesGroups[i][j].id);
              }
            }
          }
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            console.log(res);
            vm.categoriesGroups = res.data;
          });
        }


        $scope.$watch('vm.filter.Name', function(newVal, oldVal){
          if(newVal != oldVal){
            vm.filter.Handle = commonService.formatHandle(newVal);
          }
        });

        function addValue(value){
          vm.filter.Values.push(value);
          console.log(vm.filter.Values);
        }

        function editValue(newData, value){
          value = newData;
        }

        function removeValue(valueIndex){
          vm.filter.Values.splice(valueIndex, 1);
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
            console.log('You cancelled the dialog.');
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
