(function ()
{
    'use strict';

    angular
        .module('app.products.list')
        .controller('ProductsListController', ProductsListController);

    /** @ngInject */
    function ProductsListController(Products, DTOptionsBuilder, DTColumnBuilder, api, $q)
    {
        var vm = this;

        // Data
        vm.products = Products.data;
        console.log(vm.products);

        console.log(api.product.find.get().$promise);

        /*
        vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          console.log(api.product.find.get().$promise);
          return api.product.find.get().$promise;
        }).withPaginationType('full_numbers');
        */
        /*vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(d) {
          var defer = $q.defer();
          api.product.find.get({'page':2}).$promise.then(function(res){
            console.log(res);
            defer.resolve(res.data);
          })
          return defer.promise;
        })
        .withDataProp('data')
        .withPaginationType('simple')
        .withOption('responsive', true)
        .withOption('autoWidth',false)
        .withOption('processing', true)
        .withOption('dom','<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>')
        */

        vm.dtOptions = DTOptionsBuilder
                    .newOptions()
                    .withFnServerData(serverData)
                    .withDataProp('data')
                    .withOption('processing', true)
                    .withOption('serverSide', true)
                    .withOption('paging', true)
                    .withPaginationType('numbers')
                    .withDOM('<"top">t<i"bottom"p><"clear">');

        function serverData(sSource, aoData, fnCallback, oSettings) {
                    console.log(aoData);
                    console.log(sSource);
                    console.log(oSettings);

                    //All the parameters you need is in the aoData variable
                    var draw = aoData[0].value;
                    var order = aoData[2].value;
                    var start = aoData[3].value;
                    var length = aoData[4].value;


                    api.product.find.get({'page':start+1},
                      function(res){
                        var records = {
                            'draw': draw,
                            'recordsTotal': 1000,
                            'recordsFiltered': 100,
                            'data': res.data
                        };
                        fnCallback(records);
                      },
                      function(err){
                        console.log(err);
                      }
                    )





                    /*
                    //Then just call your service to get the records from server side
                    filterService.execute(start, length, order).then(function(result){

                        var records = {
                                'draw': draw,
                                'recordsTotal': result.total,
                                'recordsFiltered': result.filtered,
                                'data': result.records
                            };
                        fnCallback(records);
                    });*/
                }

        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('ItemCode').withTitle('Code'),
            DTColumnBuilder.newColumn('U_COLOR').withTitle('U_COLOR'),
            DTColumnBuilder.newColumn('U_LINEA').withTitle('U_LINEA'),
            DTColumnBuilder.newColumn('U_garantia').withTitle('U_garantia'),
            DTColumnBuilder.newColumn('OnHand').withTitle('OnHand')

        ];

        /*
        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true
        };

        */
        // Methods

        //////////
    }

})();
