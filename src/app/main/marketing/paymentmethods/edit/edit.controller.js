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
          paymentGroups:[
            {
              label:'Grupo pago 1',
              key:'paymentGroup1',
              methods:['Efectivo','Deposito','Transferencia','Cheque','Monedero Electrónico','1 Pago Visa, MasterCard, American Express']
            },
            {
              label:'Grupo pago 2',
              key:'paymentGroup2',
              methods:['3 MSI con AMEX, Banamex, Santander, Bancomer, Banorte, IXE, SCOTIABANK, INBURSA, AFIRME, BANBAJIO, BANJERCITO, BANCAMIFEL, ITAUCARD, PREMIUMCARD, BANREGIO, BANCOAHORRO, FAMSA']
            },
            {
              label:'Grupo pago 3',
              key:'paymentGroup3',
              methods:[
                '6 MSI con AMEX, Banamex, Santander, Bancomer, Banorte, IXE, SCOTIABANK, INBURSA, AFIRME, BANBAJIO, BANJERCITO, BANCAMIFEL, ITAUCARD, PREMIUMCARD, BANREGIO, BANCOAHORRO, FAMSA',
                '9 MSI con AMEX, Banamex, Santander, Bancomer'
              ]
            },
            {
              label:'Grupo pago 4',
              key:'paymentGroup4',
              methods:[
                '12 MSI con AMEX, Banamex, Santander, Bancomer, Banorte, IXE, SCOTIABANK, INBURSA, AFIRME, BANBAJIO, BANJERCITO, BANCAMIFEL, ITAUCARD, PREMIUMCARD, BANREGIO, BANCOAHORRO, FAMSA'
              ]
            },
            {
              label:'Grupo pago 5',
              key:'paymentGroup5',
              methods:['18 MSI con AMEX, Banamex']
            },
          ],
          onSelectStartDate: onSelectStartDate,
          onSelectEndDate: onSelectEndDate,
          formatGroupsOnCreate: formatGroupsOnCreate,
          update: update,
          init: init
        });

        function init(){
          pmPeriodService.findById($stateParams.id).then(function(res){
            vm.pmPeriod = res.data;
            console.log(vm.pmPeriod);
            vm.startTime = new Date(angular.copy(vm.pmPeriod.startDate));
            vm.endTime = new Date(angular.copy(vm.pmPeriod.endDate));
            vm.paymentGroups = vm.paymentGroups.map(function(pg){
              if(vm.pmPeriod[pg.key]){
                pg.isActive = true;
              }
              return pg;
            });

            $timeout(function(){
              console.log(vm.pmPeriod);
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

        function formatGroupsOnCreate(){
          vm.paymentGroups.forEach(function(pg){
            vm.pmPeriod[pg.key] = pg.isActive;
          })
        }

        function update(form){
          if(form.$valid){
            vm.formatGroupsOnCreate();
            vm.pmPeriod.startDate = commonService.combineDateTime(vm.pmPeriod.startDate,vm.startTime);
            vm.pmPeriod.endDate = commonService.combineDateTime(vm.pmPeriod.endDate,vm.endTime, 59);
            vm.isLoading = true;
            console.log(vm.pmPeriod);
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
