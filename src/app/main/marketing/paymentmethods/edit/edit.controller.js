(function ()
{
    'use strict';

    angular
        .module('app.marketing.pm.edit')
        .controller('MarketingPMEditController', MarketingPMEditController);

    /** @ngInject */
    function MarketingPMEditController($scope, $q, $stateParams, $timeout ,commonService, pmPeriodService, dialogService){
        var vm = this;

        angular.extend(vm,{
          paymentGroups: commonService.getPopulatedPaymentGroups(),
          onSelectStartDate: onSelectStartDate,
          onSelectEndDate: onSelectEndDate,
          update: update,
          init: init
        });

        function init(){
          pmPeriodService.findById($stateParams.id).then(function(res){
            vm.pmPeriod = res.data;
            vm.startTime = new Date(angular.copy(vm.pmPeriod.startDate));
            vm.endTime = new Date(angular.copy(vm.pmPeriod.endDate));
            vm.paymentGroups = vm.paymentGroups.map(function(pg){
              if(vm.pmPeriod[pg.key]){
                pg.isActive = true;
              }
              if(vm.pmPeriod[pg.ewalletKey]){
                pg.isActiveEwallet = true;
              }
              return pg;
            });

            $timeout(function(){
              vm.myPickerEndDate.setMinDate(new Date(vm.pmPeriod.startDate) );
              vm.myPickerStartDate.setMaxDate( new Date(vm.pmPeriod.endDate) );
            },1000);

          });
        }

        function onSelectStartDate(pikaday){
          vm.pmPeriod.startDate = pikaday._d;
          vm.myPickerEndDate.setMinDate(vm.pmPeriod.startDate);
        }


        function onSelectEndDate(pikaday){
          vm.pmPeriod.endDate = pikaday._d;
          vm.myPickerStartDate.setMaxDate(vm.pmPeriod.endDate);
        }

        function formatGroupsOnUpdate(){
          vm.paymentGroups.forEach(function(pg){
            vm.pmPeriod[pg.key] = pg.isActive;
            vm.pmPeriod[pg.ewalletKey] = pg.isActiveEwallet;
          })
        }

        function update(form){
          if(form.$valid){
            formatGroupsOnUpdate();
            vm.pmPeriod.startDate = commonService.combineDateTime(vm.pmPeriod.startDate,vm.startTime);
            vm.pmPeriod.endDate = commonService.combineDateTime(vm.pmPeriod.endDate,vm.endTime, 59);
            vm.isLoading = true;
            pmPeriodService.update(vm.pmPeriod.id,vm.pmPeriod).then(function(res){
              var result = res.data;
              if(result.overlaps){
                dialogService.showDialog('Fecha de vigencia invalida, ya hay registros en ese rango de fechas');
                vm.isLoading = false;
              }else{
                dialogService.showDialog('Vigencia registrada');
                vm.isLoading = false;
              }

            }).catch(function(err){
              console.log(err);
              dialogService.showDialog('Error, revisa los datos');
              vm.isLoading = false;
            });
          }else{
            dialogService.showDialog('Revisa los datos incompletos');
          }

        }

        vm.init();
    }
})();
