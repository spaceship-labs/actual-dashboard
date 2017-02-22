(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersEditController', UsersEditController);

    /** @ngInject */
    function UsersEditController($mdDialog, $stateParams, userService, api, dialogService){
        var vm      = this;
        var sending = false;
        vm.basicForm = {};
        vm.formWizard = {};
        vm.roles = [];
        vm.modules = userService.getAllModules();
        vm.permissions = [];
        vm.stores = [];
        vm.notifications = [];

        vm.isLoading = false;

        // Methods
        vm.sendForm          = sendForm;
        vm.toggleStore     = toggleStore;
        vm.isStoreSelected = isStoreSelected;

        function isStoreSelected(id) {
          if(!vm.user){
            return false;
          }
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

        init();

        //////////

        function init(){
          userService.getUser($stateParams.id).then(function(res){
            vm.user           = res.data.data;
            vm.user.role      = (vm.user.role && vm.user.role.id) || vm.user.role;
            vm.user.Stores    = (vm.user.Stores || []).map(function(store) {return store.id;});
            if(vm.user.mainStore){
              vm.user.mainStore = vm.user.mainStore.id;
            }
            vm.modules.forEach(function(module){
              if(vm.user.accessList && vm.user.accessList.indexOf(module.key) >= 0){
                module.isActive = true;
              }
            });
            return vm.user;
          }).then(function(user){
            console.log('user',user);
            userService.getSellers().then(function(res){
              vm.sellers = res.data;
              if(user.Seller && user.Seller.SlpCode != -1){
                vm.sellers   = res.data.concat(user.Seller);
              }
              vm.sellers.unshift({id:null, SlpName:'Ninguno'});
              if(user.Seller){
                user.Seller = user.Seller.id;
              }else{
                user.Seller = vm.sellers[0].id;
              }
            });
          });

          api.$http.get('/logging/find', {user: $stateParams.id}).then(function(res){
            vm.notifications = res.data.map(function(notification) {
              return Object.assign(notification, {
                createdAt: moment(notification.createdAt).fromNow()
              });
            });
          });

          api.$http.get('/permission/find').then(function(res) {
            vm.permissions = res.data;
          });

          api.$http.get('/store/find').then(function(res) {
            vm.stores = res.data;
          });

          api.$http.get('/role/find').then(function(res) {
            vm.roles = res.data;
          });

        }

        /**
         * Send form
         */
        function sendForm(form){
          if (sending) {
            return;
          }
          sending = true;
          if(form.$valid){
            var params = vm.user;
            params.accessList  = vm.modules.reduce(function(acum, module){
              if(module.isActive){
                return acum.concat(module.key);
              }
              return acum;
            }, []);
            params.permissions = params.accessList.map(function(name) {
              var permission= vm.permissions.find(function(permission) {
                return permission.name == name;
              });
              return permission && permission.id;
            });
            params.permissions = params.permissions.filter(function(per){
              return per;
            });
            vm.isLoading = true;
            userService.update(vm.user.id, params)
              .then(
                function(res){
                  sending = false;
                  dialogService.showDialog('Datos guardados');
                  // Clear the form data
                  vm.formWizard = {};
                  vm.isLoading = false;
                },
                function(errUpdate){
                  sending = false;
                  console.log(errUpdate);
                  var error = errUpdate.data || errUpdate;
                  error = error ? error.toString() : '';
                  dialogService.showDialog('Hubo un error: ' + error );          
                  vm.isLoading = false;
                }
            );

          }else{
            var errors = [];
            sending = false;
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }


        }

    }
})();
