(function ()
{
    'use strict';

    angular
        .module('app.products.materials.list')
        .controller('ProductMaterialsListController', ProductMaterialsListController);

    /** @ngInject */
    function ProductMaterialsListController( $mdDialog, $mdMedia, productService, dialogService){
        var vm = this;

        vm.init = init;
        vm.groupMaterials = groupMaterials;
        vm.mergeMaterialsGroups = mergeMaterialsGroups;
        vm.newMaterial = newMaterial;

        vm.isLoading = false;
        vm.woodMaterials = [];
        vm.metalMaterials = [];
        vm.syntethicMaterials = [];
        vm.organicMaterials = [];
        vm.glassMaterials = [];
        vm.materialsGroups = [];

        vm.addMaterial = addMaterial;
        vm.editMaterial = editMaterial;
        vm.removeMaterial = removeMaterial;
        vm.openMaterialForm = openMaterialForm;

        vm.init();

        //Methods

        function init(){
          productService.getMaterials().then(function(res){
            console.log('rreeess');
            console.log(res);
            vm.materials = res.data;
            vm.groupMaterials();
          });
        }

        function mergeMaterialsGroups(){
          vm.materials = [];
          vm.materialsGroups.forEach(function(group){
            console.log(group);
            vm.materials = vm.materials.concat(group.materials);
          });
        }

        function groupMaterials(){
          vm.woodMaterials = [];
          vm.metalMaterials = [];
          vm.syntethicMaterials = [];
          vm.organicMaterials = [];
          vm.glassMaterials = [];


          vm.materials.forEach(function(material){
            if(material.IsWood){
              vm.woodMaterials.push(material);
            }
            else if(material.IsMetal){
              vm.metalMaterials.push(material);
            }
            else if(material.IsSynthetic){
              vm.syntethicMaterials.push(material);
            }
            else if(material.IsOrganic){
              vm.organicMaterials.push(material);
            }
            else if(material.IsGlass){
              vm.glassMaterials.push(material);
            }
          });

          vm.materialsGroups = [
            {label: 'Madera', materials: vm.woodMaterials, type:'IsWood'},
            {label: 'Metal', materials: vm.metalMaterials, type:'IsMetal'},
            {label: 'Sintetico', materials: vm.syntethicMaterials, type:'IsSynthetic'},
            {label: 'Organico', materials: vm.organicMaterials, type:'IsOrganic'},
            {label: 'Vidrio', materials: vm.glassMaterials, type:'IsGlass'},
          ];

        }


        function newMaterial(chip, materialType){
          var material = {Name:chip};
          material[materialType] = true;
          return material;
        }

        function addMaterial(material, group){
          material[group.type] = true;
          vm.isLoading = true;
          productService.createMaterial(material).then(function(res){
            console.log(res);
            vm.isLoading = false;
            vm.materials.push(res.data);
            vm.groupMaterials();
          });
        }

        function editMaterial(newData, material){
          vm.isLoading = true;
          productService.updateMaterial(material.id, newData).then(function(res){
            console.log(res);
            material = res.data;
            vm.isLoading = false;
            vm.groupMaterials();
          });
        }

        function removeMaterial($ev,materialId, materialIndex, group){
          var hasRedirect = false;
          var isPromise = true;
          console.log('empezo removeValue');
          dialogService.showDestroyDialog(
            $ev,
            productService.destroyMaterial,
            materialId,
            hasRedirect,
            isPromise,
            vm.isLoading
          ).then(function(res){
            console.log(res);
            group.materials.splice(materialIndex, 1);
          });

        }

        function openMaterialForm(ev, action, material, group) {
          console.log('creatematerial');
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          var params = {
            material: material,
            action: action
          };
          $mdDialog.show({
            controller: MaterialFormController,
            templateUrl: 'app/main/products/materials/material-form.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
            locals: params
          })
          .then(function(newData) {
            if(action === 'add'){
              vm.addMaterial(newData, group);
            }
            else if(action === 'edit'){
              vm.editMaterial(newData, material);
            }
          }, function() {
            console.log('You cancelled the dialog.');
          });
        };



        function MaterialFormController($scope, commonService, material, action){
          $scope.material = material || {};
          $scope.action = action || 'add';
          $scope.actionLabel = 'Crear';
          if($scope.action === 'edit'){
            $scope.actionLabel = 'Editar';
          }
          $scope.cancel = function(){ $mdDialog.cancel(); };
          $scope.submit = function(material){ $mdDialog.hide(material); };

          $scope.$watch('material.Name', function(newVal, oldVal){
            if(newVal != oldVal){
              $scope.material.Handle = commonService.formatHandle(newVal);
            }
          });
        }


    }
})();
