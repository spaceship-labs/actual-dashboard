(function ()
{
    'use strict';

    angular
        .module('app.products.search')
        .controller('ProductsSearchController', ProductsSearchController);

    /** @ngInject */
    function ProductsSearchController(DTOptionsBuilder, DTColumnBuilder, api, $q, Lines,Color, $location)
    {
        var vm = this;
        vm.doSearch = doSearch;
        vm.init = init;
        vm.goTo = goTo;

        // Data
        vm.products = [];
        vm.isLoading = false;
        vm.apiResource = api.product.search.get;
        vm.lines = Lines.data;
        vm.colors = Color.data;
        console.log(vm.colors);
        vm.search = {};

        vm.page = 1;
        vm.start = 0;
        vm.length = 10;
        vm.total = 0;

        vm.init();

        console.log(Lines);

        // Methods

        function init(){
          console.log('hey');
          vm.doSearch();
          vm.lines.unshift({Code:false,Name:'Todos'});
          vm.search.line = vm.lines[0].code;
        }

        function doSearch(_page){
          var length = vm.length;
          var query = {};
          var page = _page || 1;
          vm.page = page;

          console.log('_PAge: ' + _page);
          console.log('Page: ' + page);

          vm.isLoading = true;

          //var vm.search = '';
          //page = (start==0) ? 1 : (start/length) + 1;


          if(vm.search != ''){
              query = {page:page,term:vm.search.term}
          }else{
              query.page = page;
          }

          query.line = vm.search.line;
          query.color = vm.search.color;

          vm.apiResource(query,
            function(res){
              console.log(res);
              var records = {
                  'recordsTotal': res.total,
                  'recordsFiltered': res.total,
                  'data': res.data
              };
              //fnCallback(records);
              vm.products = res.data;
              vm.total = res.total;
              vm.pages = res.total / res.length;
              vm.isLoading = false;
            },
            function(err){
              console.log(err);
              vm.isLoading = false;
            }
          );

        }

        function goTo(itemCode){
          $location.path('/products/view/' + itemCode);
        }

        //////////
    }

})();
