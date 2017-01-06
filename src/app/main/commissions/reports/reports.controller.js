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
        $filter,
        $mdDialog,
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
            {key: 'status', label: 'Estatus',  mapper: {paid: 'pagada', pending: 'pendiente'}, color: {paid: 'green', pending: 'red'}},
            {key: 'user.name', label: 'Usuario'},
            {key: 'role', label: 'Rol', mapper: {seller: 'Vendedor', 'store manager': 'Gerente'}},
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
        vm.runReport = runReport;
        vm.downloadExcel = downloadExcel;
        vm.downloadPDF = downloadPDF;
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

        function runReport() {
          var filters = Object.assign({}, vm.filters);
          for (var key in filters) {
            if (filters[key] == undefined) {
              delete filters[key];
            }
          }
          commissionsService
            .runReport(filters)
            .then(function() {
              $rootScope.$broadcast('reloadTable', true);
            })
            .catch(function(err){
              var data = err.data.message;
              $mdDialog.show(
                $mdDialog.alert({
                  title: 'Hubo un problema',
                  textContent: data,
                  ok: 'Close'
                })
              );
            });
        }

        function downloadExcel() {
          vm.csvtitle = 'Reporte_de_comisiones-' + moment().format('') + '.csv';
          var filters = Object.assign({}, vm.filters);
          for (var key in filters) {
            if (filters[key] == undefined) {
              delete filters[key];
            }
          }
          return commissionsService.all(filters).then(function(data) {
            return data.map(function(ci) {
              if (ci.role == 'seller') {
                var role = 'Vendedor';
              }
              if (ci.role == 'store manager') {
                var role = 'Gerente';
              }
              return {
                folio: ci.folio,
                store: ci.store.name,
                user: ci.user.firstName + ' ' + ci.user.lastName,
                rol: role,
                payment: moment(ci.datePayment).format('d/MMM/YYYY'),
                ammountPayment: $filter('currency')(ci.ammountPayment),
                ammountPaymentNoIVA: $filter('currency')(ci.ammountPayment / 1.16),
                ammountRate: (ci.rate * 100).toFixed(2) + '%',
                ammount: $filter('currency')(ci.ammount),
              };
            });
          });
        }

        function downloadPDF() {
          var filters = Object.assign({}, vm.filters);
          for (var key in filters) {
            if (filters[key] == undefined) {
              delete filters[key];
            }
          }
          commissionsService.all(filters).then(function(data) {
            return data.map(function(ci) {
              if (ci.role == 'seller') {
                var role = 'Vendedor';
              }
              if (ci.role == 'store manager') {
                var role = 'Gerente';
              }
              return [
                ci.folio.toFixed(0),
                ci.store.name,
                ci.user.firstName + ' ' + ci.user.lastName,
                role,
                moment(ci.datePayment).format('d/MMM/YYYY'),
                $filter('currency')(ci.ammountPayment),
                $filter('currency')(ci.ammountPayment / 1.16),
                (ci.rate * 100).toFixed(2) + '%',
                $filter('currency')(ci.ammount),
              ];
            });
          })
          .then(generatePdf);
        }

        function generatePdf(data) {
          var title = 'Reporte_de_comisiones-' + moment().format('');
          var body =  [
            [
              {text: 'Folio', style: 'header'},
              {text: 'Tienda', style: 'header'},
              {text: 'Usuario', style: 'header'},
              {text: 'Rol', style: 'header'},
              {text: 'Fecha de cobro', style: 'header'},
              {text: 'Monto de cobro', style: 'header'},
              {text: 'Monto de cobro sin IVA', style: 'header'},
              {text: 'Comisión', style: 'header'},
              {text: 'Monto de comisión', style: 'header'},
            ]
          ].concat(data);
          var docDefinition = {
            content: [
              {
                text: title,
              },
              {
                style: 'demoTable',
                table: {
                  widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
                  body: body,
                }
              }
            ],
            styles: {
              header: {
                bold: true,
                color: '#000',
                fontSize: 11
              },
              demoTable: {
                color: '#666',
                fontSize: 10
              }
            }
          };
          pdfMake.createPdf(docDefinition).download(title);
          //
        }
    }
})();
