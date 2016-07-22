(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $location, localStorageService, $timeout, $state, jwtHelper, userService)
    {
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams)
        {
            //TODO verificar una forma mas segura de hacer esto
            var _token = localStorageService.get('token') || false;
            var _user = localStorageService.get('user') || false;

            //Check if token is expired
            if(_token){
              var expiration = jwtHelper.getTokenExpirationDate(_token);
              console.log(expiration);
              if(expiration <= new Date() && !toState.isPublic){
                event.preventDefault();
                localStorageService.remove('user');
                localStorageService.remove('token');
                $state.go('app.auth_login');
                //$location.path('/auth/login')
              }
            }

            if(!_token && !toState.isPublic){
              event.preventDefault();
              $state.go('app.auth_login');
              //$location.path('/auth/login')
            }

            else if(_token && toState.moduleName && toState.name != 'app.accesdenied'){
              //console.log(_token);
              userService.getUser(_user.id).then(function(res){
                _user = res.data.data;
                if(!_user.id){
                  localStorageService.remove('user');
                  localStorageService.remove('token');
                  $state.go('app.auth_login');
                }
                if( _user.accessList && _user.accessList.indexOf(toState.moduleName) >= 0 ){
                  console.log('esta autorizado a entrar a :'+ toState.moduleName);
                  return true;
                }else{
                  console.log('no esta autorizado a entrar a :'+ toState.moduleName);
                  event.preventDefault();
                  $state.go('app.accesdenied');
                }

              });

            }


            else if(_token && toState.accessList && toState.name != 'app.accesdenied'){

              userService.getUser(_user.id).then(function(res){
                _user = res.data.data;

                if(!_user.id){
                  localStorageService.remove('user');
                  localStorageService.remove('token');
                  $state.go('app.auth_login');
                }

                if(toState.accessList.length > 0){
                  for(var i= 0; i<toState.accessList.length;i++){
                    if(_user.role.name == toState.accessList[i] || _user.role.name == 'admin'){
                      return true;
                    }
                  }
                  //'Handling redirect loop'
                  if(fromState.name != 'app.accesdenied'){
                    event.preventDefault();
                    $state.go('app.accesdenied');
                  }else{
                    event.preventDefault();
                    return;
                  }
                }

              });

            }

            $rootScope.loadingProgress = true;


        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        })
    }
})();
