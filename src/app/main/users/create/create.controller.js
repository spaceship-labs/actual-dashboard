(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersCreateController', UsersCreateController);

    /** @ngInject */
    function UsersCreateController(dialogService, userService){
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
          {name:'Marketing', id:6, handle:'marketing'}
        ];

        vm.companies = [
          {label:'Actual Studio', handle:'Actual Studio'},
          {label:'Actual Home', handle:'Actual Home'},
          {label:'Actual Kids', handle:'Actual Kids'},
          {label:'Actual Group', handle:'Actual Group'},
        ];

        vm.allAppModules = {
          label: 'TODOS',
          handle:'all'
        };

        vm.appModules = [
          {
            label:'CONFIGURACIONES',
            handle:'config',
            subModules:[
              {label:'Todas', handle:'config-all'},
              {label:'Usuarios', handle:'config-users'},
              {label:'Filtros', handle:'config-filters'},
              {label:'Categorias', handle:'config-categories'},
              {label:'Agrupadores', handle:'config-grouper'},
              {label:'Metas Ventas', handle:'config-sales-goals'}
            ]
          },
          {label: 'ARTICULOS', handle: 'articles'},
          {label:'MARKETING', handle:'marketing'}
        ];

        // Methods
        vm.sendForm = sendForm;

        //////////

        userService.getSellers().then(function(res){
          vm.sellers = res.data;
          console.log(vm.sellers);
        });


        /**
         * Send form
         */
        function sendForm(ev){
          console.log(vm.basicForm);
          if(vm.basicForm.password === vm.basicForm.confirmPassword){
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
