(function() {
  'use strict';

  angular
    .module('app.configuration.ewallet')
    .controller('ConfigEwalletController', ConifgEwalletController);

  /** @ngInject */
  function ConifgEwalletController(
    $http,
    api,
    $scope,
    $timeout,
    commonService,
    dialogService,
    ewalletService
  ) {
    var vm = this;

    angular.extend(vm, {
      myPickerEndDate: {},
      onSelectEndDate: onSelectEndDate,
      init: init,
      update: update,
    });

    init();

    function init() {
      vm.isLoading = true;
      ewalletService
        .find()
        .then(function(res) {
          console.log('response: ', res.data);
          vm.ewallet = res.data[0] || {};
          vm.ewallet.exchangeRate = vm.ewallet.exchangeRate || 0;
          vm.ewallet.maximumPercentageToGeneratePoints =
            vm.ewallet.maximumPercentageToGeneratePoints || 0;
          vm.endTime = new Date(angular.copy(vm.ewallet.expirationDate));
          vm.isLoading = false;
          $timeout(function() {
            vm.myPickerEndDate.setMaxDate(new Date(vm.ewallet.expirationDate));
          }, 1000);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    function onSelectEndDate(pikaday) {
      vm.ewallet.expirationDate = pikaday._d;
      vm.myPickerEndDate.setMaxDate(vm.ewallet.expirationDate);
    }
    function update(form) {
      if (form.$valid) {
        vm.isLoading = true;
        vm.ewallet.expirationDate = commonService.combineDateTime(
          vm.ewallet.expirationDate,
          vm.endTime,
          59
        );
        if (vm.ewallet.id) {
          ewalletService
            .update(vm.ewallet.id, vm.ewallet)
            .then(function(res) {
              console.log(res.data);
              dialogService.showDialog(
                'Configuración del monedero actualizada'
              );
              vm.isLoading = false;
            })
            .catch(function(err) {
              console.log(err);
              dialogService.showDialog('Error, revisa los datos');
              vm.isLoading = false;
            });
        } else if (!vm.ewallet.id) {
          ewalletService
            .create(vm.ewallet)
            .then(function(res) {
              console.log(res.data);
              dialogService.showDialog(
                'Configuración del monedero actualizada'
              );
              vm.isLoading = false;
            })
            .catch(function(err) {
              console.log(err);
              dialogService.showDialog('Error, revisa los datos');
              vm.isLoading = false;
            });
        }
      } else {
        console.log(form);
        dialogService.showDialog('Datos incompletos');
      }
    }
  }
})();
