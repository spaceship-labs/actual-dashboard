(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersEditController', UsersEditController);

    /** @ngInject */
    function UsersEditController($mdDialog, User, api){
        console.log(User);
        var vm = this;

        // Data
        vm.user = User;
        vm.basicForm = {};
        vm.formWizard = {};

        vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state)
        {
            return {abbrev: state};
        });

        // Methods
        vm.sendForm = sendForm;

        //////////

        /**
         * Send form
         */
        function sendForm(ev){
            api.user.updateById.update({'id':vm.user.id},vm.user,
              function(res){
                console.log(res);
              },
              function(err){
              console.log(err);
              }
            );

            showDialog('Datos guardados',ev);
            // Clear the form data
            vm.formWizard = {};
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
