(function ()
{
    'use strict';

    angular
        .module('app.marketing.pm.create')
        .controller('MarketingPMCreateController', MarketingPMCreateController);

    /** @ngInject */
    function MarketingPMCreateController($scope, $q,commonService, pmPeriodService, dialogService){
        var vm = this;

        angular.extend(vm,{
          pmPeriod:{},
          paymentGroups: commonService.getPopulatedPaymentGroups(),
          onSelectStartDate: onSelectStartDate,
          onSelectEndDate: onSelectEndDate,
          formatGroupsOnCreate: formatGroupsOnCreate,
          create: create
        });

        function onSelectStartDate(pikaday){
          vm.pmPeriod.startDate = pikaday._d;
          vm.myPickerEndDate.setMinDate(vm.pmPeriod.startDate);
        }


        function onSelectEndDate(pikaday){
          vm.pmPeriod.endDate = pikaday._d;
          vm.myPickerStartDate.setMaxDate(vm.pmPeriod.endDate);
        }

        function formatGroupsOnCreate(){
          vm.paymentGroups.forEach(function(pg){
            vm.pmPeriod[pg.key] = pg.isActive;
            vm.pmPeriod[pg.ewalletKey] = pg.isActiveEwallet;
          })
        }

        function create(form){
          if(form.$valid){
            vm.formatGroupsOnCreate();
            vm.pmPeriod.startDate = commonService.combineDateTime(vm.pmPeriod.startDate,vm.startTime);
            vm.pmPeriod.endDate = commonService.combineDateTime(vm.pmPeriod.endDate,vm.endTime,59);
            vm.isLoading = true;
            console.log(vm.pmPeriod);
            pmPeriodService.create(vm.pmPeriod).then(function(res){
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
    }
})();
