(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming,$location, $scope, $rootScope, localStorageService, authService){
        var vm = this;

        $scope.successAuth = function(res){
          console.log(res);
          localStorageService.set('token', res.token);
          localStorageService.set('user', res.user);

          $scope.token = res.token;
          $scope.user = res.user;

          $location.path('/products');
        }

        $scope.successRegister = function(res){
          console.log(res);

          localStorageService.set('token', res.data.token);
          localStorageService.set('user', res.data.user);

          $scope.token = res.data.token;
          $scope.user = res.data.user;
          $location.path('/products');

        }

        $scope.logout = function () {
          authService.logout(function () {
            $location.path('/auth/login');
          });
        };

        $scope.init = function(){
          $scope.token = localStorageService.get('token');
          $scope.user = localStorageService.get('user');
        }

       $scope.tinymceOptions = {
          //plugins: 'link wordcount',
          plugins: 'charactercount',
          menu:{
            edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
            insert : {title : 'Insert', items : 'link media | template hr'},
          },
          //toolbar: false,
          //toolbar: 'undo redo',
          //toolbar: 'undo redo | bold italic ',
          //toolbar: 'undo redo',
          limitChars: 400,
          //menu: false,
          //toolbar: false,
          browser_spellcheck: true
        };

        // Data
        vm.themes = fuseTheming.themes;

        $scope.init();

    }
})();
