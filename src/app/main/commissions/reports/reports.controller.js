(function ()
{
    'use strict';

    angular
        .module('app.commissions.reports')
        .controller('CommissionsReportsController', CommissionsReportsController);

    /** @ngInject */
      function CommissionsReportsController(
        $rootScope,
        $scope,
        DTOptionsBuilder,
        DTColumnBuilder,
        api,
        $q,
        storeService,
        commissionsService
      ){
        var vm = this;
        vm.filters = {};
        var today = new Date();
        $scope.year = today.getFullYear();
        $scope.month = today.getMonth();
        $scope.period = today.getDate() < 16 ? 1: 2;
        setFilterDate($scope.year, $scope.month, $scope.period);
        vm.columns = [
            {key: 'folio', label: 'Folio'},
            {key: 'quotation', label: 'Oportunidad', seeUrl:'http://ventas.miactual.com/quotations/edit/', propId: 'quotation'},
            {key: 'order', label: 'Orden', seeUrl:'http://ventas.miactual.com/checkout/order/', propId: 'order'},
            {key: 'datePayment', label: 'Fecha de pago', date: true },
            {key: 'ammountPayment', label: 'Monto de pago', currency: true},
            {key: 'rate', label: 'Comisión', isRateNormalized: true, rate: true},
            {key: 'ammount', label: 'Monto de comisión', currency: true},
            {key: 'status', label: 'Estatus',  mapper: {paid: 'pagada', pending: 'pendiente'}},
            {key: 'user.name', label: 'Usuario'},
        ];
        vm.apiResource = commissionsService.getList;
        vm.years  = range(new Date().getFullYear(), 1999, -1);
        vm.months = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ].map(function(m, i) { return [i, m]; });
        vm.setFilterDate = setFilterDate;
        init();

        function init() {
          $scope.$watch(function() {
            return vm.filters && vm.filters.store;
          }, function() {
            $rootScope.$broadcast('reloadTable', true);
          });
          $scope.$watch(function() {
            return vm.filters && vm.filters.user;
          }, function() {
            $rootScope.$broadcast('reloadTable', true);
          });

          getStores();
          $scope.$watch(function() {
            return vm.filters && vm.filters.store
          }, getUsers);
        }

        function getStores() {
          storeService.getAllStores().then(function(stores){
            vm.stores = stores;
          });
        }

        function getUsers(store) {
          storeService.commissionables(store).then(function(users) {
            vm.users  = users.map(function(u) {
              if (u.role.name == 'seller') {
                u.role = 'vendedor';
              } else if (u.role.name == 'store manager') {
                u.role = 'gerente';
              }
              return u;
            });
          });
        }

        function range(from, to, step) {
          var step   = step || 1;
          var length = Math.abs((to - from) / step);
          var acum   = [];
          for (var i = 0; i < length; i++) {
            acum = acum.concat(from + (i * step));
          }
          return acum;
        }

        function setFilterDate(year, month, period) {
          if (!(year && month && period)) {
            return;
          }
          if (period == 1) {
            var dateFrom = new Date(year, month, 1);
            var dateTo   = new Date(year, month, 16);
          } else {
            var dateFrom = new Date(year, month, 16);
            var dateTo   = setLastDay(new Date(year, month, 1));
          }
          vm.filters.createdAt =  {
            '>=': dateFrom,
            '<': dateTo
          };
          $rootScope.$broadcast('reloadTable', true);
        }

        function setLastDay(date) {
          var date = new Date(date);
          return new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
    }
})();
