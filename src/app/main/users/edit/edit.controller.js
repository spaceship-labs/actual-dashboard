(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersEditController', UsersEditController);

    /** @ngInject */
    function UsersEditController($mdDialog, $stateParams, userService){
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


        // Methods
        vm.sendForm = sendForm;
        vm.init = init;
        vm.getUsersSap = getUsersSap;

        vm.init();

        //////////

        function init(){
          userService.getUser($stateParams.id).then(function(res){
            vm.getUsersSap();
            vm.user = res.data.data;
            console.log(vm.user);
          });


        }

        /**
         * Send form
         */
        function sendForm(ev){
            userService.update(vm.user.id,vm.user)
              .then(
                function(res){
                  showDialog('Datos guardados',ev);
                  // Clear the form data
                  vm.formWizard = {};

                },
                function(err){
                console.log(err);
                }
              );

        }

        function getUsersSap(){
          userService.getUsersSap().then(function(res){
            vm.usersSap = res.data.data;
          })
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
