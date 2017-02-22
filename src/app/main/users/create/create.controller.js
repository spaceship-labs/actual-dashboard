(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersCreateController', UsersCreateController);

    /** @ngInject */
    function UsersCreateController(dialogService, userService, api){
        var vm = this;
        vm.toggleModule = toggleModule;
        vm.toggleAllModules = toggleAllModules;
        vm.moduleExists = moduleExists;
        vm.allModulesChecked = allModulesChecked;

        // Data
        vm.user = {
          modules: [],
          Stores: []
        };
        vm.basicForm = {};
        vm.formWizard = {};
        vm.roles = [];
        vm.allAppModules = {
          label: 'TODOS',
          handle:'all'
        };
        vm.modules = userService.getAllModules();
        vm.sendForm    = sendForm;
        vm.toggleStore = toggleStore;
        vm.isStoreSelected = isStoreSelected;        
        
        init();

        function isStoreSelected(id) {
          return vm.user.Stores.indexOf(id) !== -1;
        }

        function toggleStore(id) {
          if(vm.user){
            if (isStoreSelected(id)) {
              vm.user.Stores = vm.user.Stores.filter(function(comp){
                return comp != id;
              });
            } else  {
              vm.user.Stores = vm.user.Stores.concat(id);
            }
          }
        }


        function init() {
          userService.getSellers().then(function(res){
            vm.sellers = res.data;
            vm.sellers.unshift({id:null, SlpName:'Ninguno'});
          });

          api.$http.get('/store/find').then(function(res){
            vm.stores = res.data;
          });

          api.$http.get('/role/find').then(function(res) {
            vm.roles = res.data;
          });
        }


        function sendForm(form){
          if(form.$valid){
            if(vm.basicForm.password === vm.basicForm.confirmPassword){
                vm.user.accessList = [];
                vm.modules.forEach(function(module){
                  if(module.isActive){
                    vm.user.accessList.push(module.key);
                  }
                });
                vm.isLoading = true;
                userService.create(vm.user)
                  .then(
                    function(res){
                      console.log(res);
                      vm.isLoading = false;
                      dialogService.showDialog('Datos guardados');
                    },
                    function(err){
                      console.log(err);
                      vm.isLoading = false;
                      var error = err.data || err;
                      error = error ? error.toString() : '';
                      dialogService.showDialog('Hubo un error: ' + error );          
                    }
                  );
            }
          }else{
            var errors = [];
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }

            // Clear the form data
        }


        function toggleModule(item, list) {
          var idx = list.indexOf(item);
          if (idx > -1) {
            list.splice(idx, 1);
          }
          else {
            list.push(item);
          }
        }

        function moduleExists(item, list) {
          return list.indexOf(item) > -1;
        }

        function allModulesChecked() {
          var allCheckedFlag = true;
          vm.appModules.forEach(function(mod){
            if(!mod.selected){
              allCheckedFlag = false;
            }
            mod.subModules.forEach(function(sub){
              if(!sub.selected){
                allCheckedFlag = false;
              }
            });
          });
          return allCheckedFlag;
        }

        function toggleAllModules() {
          if ($scope.selected.length === $scope.items.length) {
            $scope.selected = [];
          } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.items.slice(0);
          }
        }

    }
})();
