(function ()
{
    'use strict';

    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, authService){

        var vm = this;

        // Data
        vm.isLoading = false;

        // Methods

        vm.signIn = function(){
          vm.isLoading = true;

          var formData = {
            email: vm.form.email,
            password: vm.form.password
          };

          authService.signIn(formData, $scope.successAuth, function(){
            console.log('Invalid');
            vm.isLoading = false;
          });

        };

        //////////
    }
})();
