(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $location, localStorageService, $timeout, $state, jwtHelper)
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
                if(expiration <= new Date()){
                  $location.path('/auth/login')
                }
            }

            if(!_token && !toState.isPublic){
              $location.path('/auth/login')
            }
            else if(_token && toState.accessList){
              if(toState.accessList.length > 0){
                for(var i= 0; i<toState.accessList.length;i++){
                  if(_user.userType == toState.accessList[i] || _user.isAdmin){
                    return true;
                  }
                }
                //'Handling redirect loop'
                if(fromState.name != 'app.products_search'){
                  event.preventDefault();
                  $state.go('app.products_search');
                }else{
                  event.preventDefault();
                  return;
                }
              }
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
