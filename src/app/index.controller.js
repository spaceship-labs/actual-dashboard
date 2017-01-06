(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(
      fuseTheming,
      $location, 
      $scope, 
      $rootScope,
      $state, 
      localStorageService, 
      authService){
        var vm = this;

        $scope.successAuth = function(res){
          var user = res.user || {};
          console.log('user', user);
          if(user.role && user.role.name === 'seller'){
            $location.path('/auth/login');
            $state.reload();
            return;
          }
          localStorageService.set('token', res.token);
          localStorageService.set('user', res.user);
          $scope.token = res.token;
          $scope.user = res.user;
          $location.path('/products');
        };

        $scope.successRegister = function(res){
          console.log(res);

          localStorageService.set('token', res.data.token);
          localStorageService.set('user', res.data.user);

          $scope.token = res.data.token;
          $scope.user = res.data.user;
          $location.path('/products');

        };

        $scope.logout = function () {
          authService.logout(function () {
            $location.path('/auth/login');
          });
        };

        $scope.init = function(){
          $scope.token = localStorageService.get('token');
          $scope.user = localStorageService.get('user');
        };

       $scope.tinymceOptions = {
          //plugins: 'link wordcount',
          plugins: [
            'charactercount advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
          ],
          toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
          menu:{
            edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
            insert : {title : 'Insert', items : 'link media | template hr'},
          },
          limitChars: 4000,
          browser_spellcheck: true
        };

        // Data
        vm.themes = fuseTheming.themes;

        $scope.init();

    }
})();
