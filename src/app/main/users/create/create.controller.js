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
          modules: []
        };
        vm.basicForm = {};
        vm.formWizard = {};

        vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state)
        {
            return {abbrev: state};
        });

        vm.roles = [
          {name:'Admin', id:1, handle:'admin'},
          {name:'Vendedor', id:2, handle:'seller'},
          {name:'Broker', id:3, handle:'broker'},
          {name: 'Editor de contenido', id:4, handle:'content-editor'},
          {name:'Contabilidad', id:5, handle:'contability'},
          {name:'Marketing', id:6, handle:'marketing'},
          {name:'Gerente', id:7, handle:'manager'}
        ];


        vm.allAppModules = {
          label: 'TODOS',
          handle:'all'
        };

        vm.modules = [
          {key:'create-users', label:'Crear usuarios', section:'users'},
          {key:'edit-users', label:'Editar usuarios', section:'users'},
          {key:'list-users', label: 'Ver usuarios', section:'users'},
          {key:'list-products', label:'Ver lista de productos', section:'products'},
          {key:'edit-products', label:'Editar productos', section:'products'},
          {key:'import-images', label:'Importar imagenes', section:'config'},
          {key:'list-leads', label:'Ver oportunidades', section:'leads'},
          {key:'create-brands', label:'Crear marcas', section:'brands'},
          {key:'edit-brands', label:'Editar marcas', section:'brands'},
          {key:'list-brands', label:'Ver marcas', section:'brands'},
          {key:'create-categories', label:'Crear categorias', section:'categories'},
          {key:'edit-categories', label:'Editar categorias', section:'categories'},
          {key:'list-categories', label:'Ver categorias', section:'categories'},
          {key:'create-filters', label:'Crear filtros', section:'filters'},
          {key:'edit-filters', label:'Editar filtros', section:'filters'},
          {key:'list-filters', label:'Ver filtros', section:'filters'},
          {key:'create-groups', label:'Crear agrupadores', section:'groups'},
          {key:'edit-groups', label:'Editar agrupadores', section:'groups'},
          {key:'list-groups', label:'Ver agrupadores', section:'groups'},
          {key:'create-marketing', label:'Crear promociones', section:'marketing'},
          {key:'edit-marketing', label:'Editar promociones', section:'marketing'},
          {key:'list-marketing', label:'Ver promociones', section:'marketing'},
          {key:'create-commissions', label:'Crear comisiones', section:'commissions'},
          {key:'edit-commissions', label:'Editar comisiones', section:'commissions'},
          {key:'list-commissions', label:'Ver comisiones', section:'commissions'},

        ];

        // Methods
        vm.sendForm = sendForm;

        //////////

        userService.getSellers().then(function(res){
          vm.sellers = res.data;
          vm.sellers.unshift({id:null, SlpName:'Ninguno'});
        });

        api.$http.get('/company/find').then(function(res){
          vm.companies = res.data;
        });


        /**
         * Send form
         */
        function sendForm(form){
          console.log(vm.basicForm);
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
                      dialogService.showDialog('Error, intenta de nuevo');
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
