(function ()
{
    'use strict';

    angular
        .module('app.products.materials.list')
        .controller('ProductMaterialsListController', ProductMaterialsListController);

    /** @ngInject */
    function ProductMaterialsListController(productService, dialogService){
        var vm = this;

        vm.init = init;
        vm.updateAll = updateAll;
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

        function updateAll(){
          vm.mergeMaterialsGroups();
          console.log(vm.materials);
          vm.isLoading = true;
          productService.updateMaterials({materials:vm.materials}).then(function(res){
            vm.isLoading = false;
            dialogService.showDialog('Materiales actualizados');
            console.log(res);

          });
        }

        function newMaterial(chip, materialType){
          var material = {Name:chip};
          material[materialType] = true;
          return material;
        }


    }
})();
