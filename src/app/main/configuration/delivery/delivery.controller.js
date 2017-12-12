(function ()
{
    'use strict';

    angular
        .module('app.configuration.delivery')
        .controller('ConfigDeliveryController', ConifgDeliveryController);

    /** @ngInject */
    function ConifgDeliveryController($http, api, $scope, zipcodeService, dialogService){
    	var vm = this;

    	angular.extend(vm, {
    		init: init,
    		updateZipcodeStates: updateZipcodeStates,
            onZoneChange: onZoneChange
    	});

    	init();

    	function init(){
    		loadZipcodeStates().then(function(zipcodeStates){
                vm.zones = buildZones(zipcodeStates);
                console.log('vm.zones', vm.zones);
            });
    	}

        function onZoneChange(zone){
            zone.states = zone.states.map(function(state){
                if(zone.deliveryPriceValue){ 
                    state.deliveryPriceValue = zone.deliveryPriceValue;
                }
                if(zone.deliveryPriceMode){
                    state.deliveryPriceMode = zone.deliveryPriceMode;
                }
                return state;
            });
        }

        function allStatesHaveTheSameValues(states){
            var size = states.length;
            var hash = false;
            for(var i=0;i<size; i++){
                if(hash){
                    if(hash !== states[i].deliveryPriceMode + '#' + states[i].deliveryPriceValue){
                        return false;
                    }
                }
                else{
                    hash = states[i].deliveryPriceMode + '#' + states[i].deliveryPriceValue;
                }
            }

            return true;
        }

        function buildZones(states){
            var groupsAux =  _.groupBy(states, 'zone');
            var zones = [];
            for(var key in groupsAux){
                var zone = {
                    deliveryPriceValue: null,
                    deliveryPriceMode: null,
                    name: key,
                    states: groupsAux[key]
                };

                if(zone.states.length > 0 && allStatesHaveTheSameValues(zone.states)){
                    zone.deliveryPriceValue = zone.states[0].deliveryPriceValue;
                    zone.deliveryPriceMode = zone.states[0].deliveryPriceMode;
                }
                zones.push(zone);
            }
            return zones;
        }

        function ungroupZones(zones){
            var states = zones.reduce(function(acum,zone){
                acum = acum.concat(zone.states);
                return acum
            },[]);
            
            return states;
        }

    	function updateZipcodeStates(){
    		vm.isLoading = true;
            var zipcodeStates = ungroupZones(vm.zones);
    		return zipcodeService.updateZipcodeStates({zipcodeStates: zipcodeStates})
    			.then(function(result){
		    		vm.isLoading = false;
    				if(result instanceof Array){
                        dialogService.showDialog('Datos actualizados');
                    }
                    console.log('result', result);
    			})
    			.catch(function(err){
		    		vm.isLoading = false;    				
    				dialogService.showDialog(err);
    			});
    	}

    	function loadZipcodeStates(){
    		return zipcodeService.getZipcodeStates().then(function(zipcodeStates){
    			//vm.zipcodeStates = zipcodeStates;
                return zipcodeStates;
    		})
    		.catch(function(err){
    			console.log('err', err);
    		});
    	}

    }
})();