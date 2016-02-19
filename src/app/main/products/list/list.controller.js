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

        vm.dtOptions = DTOptionsBuilder
                    .newOptions()
                    .withFnServerData(serverData)
                    .withDataProp('data')
                    .withOption('processing', true)
                    .withOption('serverSide', true)
                    .withOption('paging', true)
                    .withOption('responsive',true)
                    .withOption('autoWidth',true)
                    .withPaginationType('numbers')
                    .withDOM('<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>');

        function serverData(sSource, aoData, fnCallback, oSettings) {
                    //All the parameters you need is in the aoData variable
                    var draw = aoData[0].value;
                    var order = aoData[2].value;
                    var start = aoData[3].value;
                    var length = aoData[4].value;

                    console.log(aoData);

                    api.product.find.get({'page':start},
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
                    );
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
