(function ()
{
    'use strict';

    angular
        .module('app.products.search')
        .controller('ProductsSearchController', ProductsSearchController);

    /** @ngInject */
    function ProductsSearchController(Lines,Color, $location, productService, api)
    {
        var vm = this;
        vm.doSearch = doSearch;
        vm.init = init;
        vm.goTo = goTo;

        // Data
        vm.products = [];
        vm.isLoading = false;
        vm.apiResource = productService.search;
        vm.lines = Lines.data;
        vm.colors = Color.data;
        vm.search = {};
        vm.api = api;

        vm.page = 1;
        vm.start = 0;
        vm.length = 10;
        vm.total = 0;

        vm.init();

        // Methods

        function init(){
          vm.doSearch(1,true);
          vm.lines.unshift({Code:false,Name:'Todos'});
          vm.colors.unshift({Code:false,Name:'Todos'});
          vm.search.line = vm.lines[0].code;

          //Reading params from url
          var params = $location.search();
          var aux = [];
          var aux2 = [];
          if(params.term){
            vm.search.term = params.term;
          }
          if(params.color){
            aux = vm.colors.filter(function(col){
              return col.Code == params.color;
            });
            if(aux.length > 0){
              vm.search.color = aux[0].Code;
            }
          }

          if(params.line){
            aux2 = vm.lines.filter(function(line){
              return line.Code == params.line;
            });
            if(aux2.length > 0){
              vm.search.line = aux2[0].Code;
            }
          }

        }

        function doSearch(_page, firstSearch){
          var length = vm.length;
          var query = {};
          var page = _page || 1;
          vm.page = page;

          vm.isLoading = true;

          //var vm.search = '';
          //page = (start==0) ? 1 : (start/length) + 1;


          if(vm.search != ''){
              query = {page:page,term:vm.search.term}
          }else{
              query.page = page;
          }

          query.line = vm.search.line || null;
          query.color = vm.search.color || null;

          if(query.line == 'false') query.line = null;
          if(query.color == 'false') query.color = null;

          if(!firstSearch){
              if(query.page){
                $location.search('page',query.page);
              }

              $location.search('term',vm.search.term);
              $location.search('line', query.line);
              $location.search('color', query.color);
          }


          vm.apiResource(query)
            .then(
              function(res){
                console.log(res);
                var res = res.data;
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
