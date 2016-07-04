(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersEditController', UsersEditController);

    /** @ngInject */
    function UsersEditController($mdDialog, $stateParams, userService, dialogService){
        var vm = this;

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
          {name:'Marketing', id:6, handle:'marketing'}
        ];

        vm.modules = [
          {key:'create-users', label:'Crear usuarios'},
          {key:'edit-users', label:'Editar usuarios'},
          {key:'list-users', label: 'Ver usuarios'},
          {key:'list-products', label:'Ver lista de productos'},
          {key:'edit-products', label:'Editar productos'}
        ];

        vm.companies = [
          {label:'Actual Studio', handle:'Actual Studio'},
          {label:'Actual Home', handle:'Actual Home'},
          {label:'Actual Kids', handle:'Actual Kids'},
          {label:'Actual Group', handle:'Actual Group'},
        ];


        // Methods
        vm.sendForm = sendForm;
        vm.init = init;

        vm.init();

        //////////

        function init(){
          userService.getUser($stateParams.id).then(function(res){
            vm.user = res.data.data;
            console.log(vm.user);
          });

          userService.getSellers().then(function(res){
            vm.sellers = res.data;
            console.log(vm.sellers);
          });

        }

        /**
         * Send form
         */
        function sendForm(ev){
            userService.update(vm.user.id,vm.user)
              .then(
                function(res){
                  //showDialog('Datos guardados',ev);
                  dialogService.showDialog('Datos guardados');
                  // Clear the form data
                  vm.formWizard = {};
                },
                function(errUpdate){
                  console.log(errUpdate);
                  dialogService.showErrorMessage('Hubo un error');
                }
            );

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
