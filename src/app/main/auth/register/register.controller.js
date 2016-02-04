(function ()
{
    'use strict';

    angular
        .module('app.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($rootScope, $scope, authService){

      var vm = this;

      // Data
      vm.isLoading = false;

      // Methods
      vm.signUp = function(){
        vm.isLoading = true;

        var formData = {
          firstName: vm.form.firstName,
          email: vm.form.email,
          password: vm.form.password
        };

        authService.signUp(formData, $scope.successRegister, function(){
          $rootScope.error = 'Invalid credentials';
          vm.isLoading = false;
        });
      };

      //////////
    }
})();
