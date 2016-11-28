(function ()
{
    'use strict';

    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, authService){

      var vm = this;
      vm.isLoading = false;

      vm.signIn = function(){
        vm.isLoading = true;

        var formData = {
          email: vm.form.email,
          password: vm.form.password
        };

        authService.signIn(formData, $scope.successAuth, onSignInFail);
      };

      function onSignInFail(){
        console.log('Login fail');
        vm.isLoading = false;
      }

    }
})();
