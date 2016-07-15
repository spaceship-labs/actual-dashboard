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

        // Data
        //vm.user = User.data;
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

        vm.permissions = [];

        vm.companies = [
          {label:'Actual Studio', handle:'Actual Studio'},
          {label:'Actual Home', handle:'Actual Home'},
          {label:'Actual Kids', handle:'Actual Kids'},
          {label:'Actual Group', handle:'Actual Group'},
        ];

        vm.notifications = [];

        vm.isLoading = false;

        // Methods
        vm.sendForm = sendForm;
        vm.init = init;

        vm.init();

        //////////

        function init(){
          userService.getUser($stateParams.id).then(function(res){
            vm.user = res.data.data;
            vm.modules.forEach(function(module){
              if(vm.user.accessList && vm.user.accessList.indexOf(module.key) >= 0){
                module.isActive = true;
              }
            })
          });

          userService.getSellers().then(function(res){
            vm.sellers = res.data;
            vm.sellers.unshift({id:null, SlpName:'Ninguno'});
            //console.log(vm.sellers);
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
                  //showDialog('Datos guardados',ev);
                  sending = false;
                  dialogService.showDialog('Datos guardados');
                  // Clear the form data
                  vm.formWizard = {};
                  vm.isLoading = false;
                },
                function(errUpdate){
                  sending = false;
                  console.log(errUpdate);
                  dialogService.showErrorMessage('Hubo un error');
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


        function showDialog(message,ev){

          // Show the sent data.. you can delete this safely.
          $mdDialog.show({
              controller         : function ($scope, $mdDialog, formWizardData)
              {
                  $scope.formWizardData = formWizardData;
                  $scope.closeDialog = function ()
                  {
                      $mdDialog.hide();
                  }
              },
              template           : '<md-dialog>' +
              '  <md-dialog-content><h1>' + message + '</h1></md-dialog-content>' +
              '  <md-dialog-actions>' +
              '    <md-button ng-click="closeDialog()" class="md-primary">' +
              '      Aceptar' +
              '    </md-button>' +
              '  </md-dialog-actions>' +
              '</md-dialog>',
              parent             : angular.element('body'),
              targetEvent        : ev,
              locals             : {
                  formWizardData: vm.formWizard
              },
              clickOutsideToClose: true
          });
        }
    }
})();
