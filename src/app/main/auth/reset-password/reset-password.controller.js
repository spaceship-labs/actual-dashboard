(function ()
{
    'use strict';

    angular
        .module('app.auth.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController($state, api, $http){
        var vm = this;

        console.log($state.params);

        // Data
        vm.isLoading = false;
        vm.message = '';

        // Methods

        vm.resetPassword = resetPassword;

        function resetPassword(){
          if(vm.form.passwordConfirm === vm.form.password){
            vm.isLoading = true;
            var token = $state.params.token;
            var email = $state.params.email;
            var url = api.baseUrl + '/user/update_password';
            var data = {
              password: vm.form.password,
              confirm_pass: vm.form.passwordConfirm,
              email: email,
              token: token
            };

            $http.post(url, data).then(function(res){
              console.log(res);
              vm.isLoading = false;
              if(res.data.success){
                vm.processCompleted = true;
                vm.message = 'Tu contraseña se ha actualizado';
              }else{
                vm.message = 'Hubo un error, intenta de nuevo';
              }
            },function(err){
              vm.isLoading = false;
              vm.message = 'Hubo un error, intenta de nuevo';
              console.log(err)
            });
          }

        }
    }
})();
