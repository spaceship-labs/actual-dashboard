(function ()
{
    'use strict';

    angular
        .module('app.directives')
        .directive('tableList', tableList);

    var controller = function($scope, DTOptionsBuilder, DTColumnBuilder){
      $scope.dtInstance = {};
      $scope.dtOptions = DTOptionsBuilder
        .newOptions()
        .withFnServerData(serverData)
        .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withOption('paging', true)
        .withOption('responsive',true)
        .withOption('autoWidth',true)
        .withOption('displayLength', 10)
        .withOption('bLengthChange',false)
        .withPaginationType('numbers')
        .withDOM('<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>')
        .withOption('initComplete', function() {
          $('<button/>').text('Search').attr('id', 'new-search').appendTo('.dataTables_filter');
          $('.dataTables_filter input').unbind();
          $('.dataTables_filter input').keypress(function(e){
            if(e.which == 10 || e.which == 13) {
              $scope.dtInstance.DataTable.search($('.dataTables_filter input').val()).draw();
            }
          })
          $('#new-search').on('click', function() {
              $scope.dtInstance.DataTable.search($('.dataTables_filter input').val()).draw();
          })

        });

      function serverData(sSource, aoData, fnCallback, oSettings) {
                  //All the parameters you need is in the aoData variable
                  var draw = aoData[0].value;
                  var start = aoData[3].value;
                  var length = aoData[4].value;
                  var search = aoData[5].value;
                  var page = 0;
                  var query = {};
                  page = (start==0) ? 1 : (start/length) + 1;
                  if(search != ''){
                      query = {page:page,term:search.value}
                  }else{
                      query.page = page;
                  }
                  $scope.apiResource(query,
                    function(res){
                      console.log(res);
                      var records = {
                          'draw': draw,
                          'recordsTotal': res.total,
                          'recordsFiltered': res.total,
                          'data': res.data
                      };
                      fnCallback(records);
                    },
                    function(err){
                      console.log(err);
                    }
                  );
              }

      $scope.dtColumns = [];
      /*
      for(var i=0;i<$scope.columns.length;i++){
        var column = $scope.columns[i];
        $scope.dtColumns.push(
          DTColumnBuilder
            .newColumn(column.key).withTitle(column.label)
            //.renderWith(renderCell)
            .renderWith(function(data, type, full, pos){
              return renderCell(data, type, full, pos);
              //renderCell(data, type, full, pos);
            })
        );
      }
      */
      $scope.columns.forEach(function(column){
        $scope.dtColumns.push(
          DTColumnBuilder
            .newColumn(column.key).withTitle(column.label)
            .renderWith(
              function renderCell(data, type, full, pos){
                var html = data;
                if(column.actionUrl){
                  var id = (column.propId) ? column.propId : 'id';
                  html = '<a href="'+(column.actionUrl + full[id])+'">' + data + '</a>';
                }
                return html;
              }
            )
        );
      });

    };
    controller.$inject = ['$scope','DTOptionsBuilder','DTColumnBuilder'];

    /** @ngInject */
    function tableList(){
      return {
        controller : controller,
        scope : {
          apiResource : '=',
          columns: '=',
          actionUrl: '=',
          searchText: '@',
          dtColumns: '='
        },
        templateUrl : 'app/main/directives/table-list/table-list.html'
      };
    }
})();
