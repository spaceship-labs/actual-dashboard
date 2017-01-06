(function ()
{
    'use strict';

    angular
        .module('app.directives')
        .directive('tableList', tableList);

    var controller = function($scope, $rootScope , $timeout, DTOptionsBuilder, DTColumnBuilder, dialogService, $compile, $filter){
      $scope.dtInstance = {};
      $scope.isExporting = false;

      $scope.showDestroyDialog = function(ev, id){
        console.log('showDestroyDialog');
        dialogService.showDestroyDialog(ev, $scope.destroyFn, id);
      }

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
        //.withPaginationType('numbers')
        .withPaginationType('input')
        .withDOM('<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>')
        .withOption('createdRow', function(row) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        })
        .withOption('initComplete', function() {
          if($('#new-search').length <= 0){
            $('<p class="sorting-by-label"></p>').appendTo('.dataTables_wrapper .top');
            $('.dataTables_wrapper .top .sorting-by-label').text('Ordenado por: '+ $scope.columns[0].label);
            $('<button/>').text('Buscar').attr('id', 'new-search').appendTo('.dataTables_filter');

            if($scope.exportQuery){
              $('<a class="export-button" href="" ng-click="exportToExcel()">Exportar registros</a>')
                .appendTo('.dataTables_wrapper .top .sorting-by-label');
              $compile($('.export-button'))($scope);
            }

          }

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
        console.log('en serverData');

        //All the parameters you need is in the aoData variable
        var draw = aoData[0].value;
        var columns = aoData[1].value;
        var start = aoData[3].value;
        var length = aoData[4].value;
        var search = aoData[5].value;
        var page = 0;
        var query = {};
        var sorting = oSettings.aaSorting[0];

        var sortingColumnIndex = sorting[0];
        var sortingColumnLabel = $scope.columns[sortingColumnIndex].label;
        var sortingColumnName = columns[sortingColumnIndex].data;
        var sortingDirection = sorting[1].toUpperCase();

        page = (start==0) ? 1 : (start/length) + 1;
        if(search != ''){
            query = {page:page,term:search.value}
        }else{
            query.page = page;
        }

        console.log('sortingColumnName');
        console.log(sortingColumnName);

        if($scope.orderBy && !sortingColumnName){
          query.orderby = $scope.orderBy;
        }
        //Do not sort when is a destroy column
        else if(!$scope.columns[sortingColumnIndex].destroy && !$scope.columns[sortingColumnIndex].editUrl){
          query.orderby = sortingColumnName + ' ' + sortingDirection;
          $('.dataTables_wrapper .top .sorting-by-label').text('Ordenado por: '+ sortingColumnLabel);
        }

        query.fields = [];
        query.filters = $scope.filters || false;
        $scope.columns.forEach(function(col){
          if(!col.destroy && !col.editUrl && !col.quickEdit ){
            query.fields.push(col.key);
          }
        });

        //console.log(query.orderby);

        $scope.query = query;
        $scope.page = page;

        $scope.apiResource(page,query)
          .then(
            function(result){
              console.log(result);
              var res = result.data;

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

      $scope.columns.forEach(function(column){
        $scope.dtColumns.push(
          DTColumnBuilder
            .newColumn(column.key).withTitle(column.label)
            .renderWith(
              function renderCell(data, type, full, pos){
                var html = '';
                if(column.yesNo){
                  data = data ? 'Si' : 'No';
                }
                if(!data && data != 0){
                  data = data ? data : 'No asignado';
                }
                if(column.defaultValue){
                  data = data ? data : column.defaultValue;
                }
                if(column.mapper){
                  var data_b = data;
                  data = column.mapper[data] || data;
                }
                if(column.date){
                  data = $filter('date')(data, 'dd/MMM/yyyy');
                }
                if(column.dateMonth){
                  var months = [
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
                    'Diciembre',
                  ];
                  var date  = new Date(data);
                  var month = date.getMonth();
                  var year  = date.getFullYear();
                  data = months[month] + ', ' + year;
                }
                if(column.currency){
                  data = $filter('currency')(data);
                }
                if(column.isRateNormalized){
                  data = data * 100;
                }
                if(column.rate){
                  data = $filter('number')(data) + '%';
                }

                if(column.destroy){
                  var id = (column.propId) ? column.propId : 'id';
                  html = '<a href="#" ng-click="showDestroyDialog($event, \''+ full[id] +'\')">Eliminar</a>';
                }
                else if(column.editUrl){
                  var id = (column.propId) ? column.propId : 'id';
                  var icon = '<md-icon md-font-icon="icon-pencil" class="icon edit-pencil md-font icon-pencil material-icons md-default-theme" aria-hidden="true"></md-icon>';

                  if($scope.quickEdit){
                    html = '<a href="#" ng-click="editFn($event'+ ', \'' + full[id]+'\' )">' + icon + '</a>';
                  }else{
                    html = '<a href="'+(column.editUrl + full[id])+'">' + icon + '</a>';
                  }
                }
                else if(column.seeUrl) {
                  var id = (column.propId) ? column.propId : 'id';
                  if (full[id]) {
                    var icon = '<md-icon md-font-icon="icon-link" class="icon icon-link md-font icon-link material-icons md-default-theme" aria-hidden="true"></md-icon>';
                    html = '<a target="_blank" href="'+(column.seeUrl + full[id])+'">' + icon + '</a>';
                  } else {
                    var icon = '<md-icon md-font-icon="icon-link" class="icon icon-link gray md-font material-icons md-default-theme" aria-hidden="true"></md-icon>';
                    html = '<a>' + icon + '</a>';
                  }
                }
                else if(column.color) {
                  data_b = column.color[data_b] || data_b;
                  html = '<span style="color:' + data_b + ';">' + data + '</span>';
                }
                else{
                  if(column.actionUrl){
                    var id = (column.propId) ? column.propId : 'id';
                    if($scope.quickEdit){
                      html = '<a href="#" ng-click="editFn($event'+ ', \'' + full[id]+ '\')">' + data + '</a>';
                    }

                    else{
                      html = '<a href="'+(column.actionUrl + full[id])+'">' + data + '</a>';
                    }
                  }
                  else if(column.key === 'ItemName' && full['Name']){
                    html = full['Name'];
                  }
                  else{
                    html = data || '';
                  }
                }

                return html;
              }
            )
        );
      });

      $rootScope.$on('reloadTable', function(event, data){
        $timeout(function(){
          var callback = function(json){console.log(json);}
          var resetPaging = false;
          console.log('filters');
          console.log($scope.filters);
          if($scope.dtInstance){
            //$scope.dtInstance.rerender();
            $scope.dtInstance.DataTable.search($('.dataTables_filter input').val()).draw();
          }

        }, 100);
      });

      //$rootScope.$on('exportData', function(event, data){
      $scope.exportToExcel = function(){
        if(!$scope.isExporting){
          $scope.isExporting = true;
          $('.export-button').text('Exportando...');
          var auxQuery = angular.copy($scope.query);
          auxQuery.getAll = true;
          $scope.apiResource($scope.page, auxQuery).then(function(result){
            var items = result.data.data;
            alasql($scope.exportQuery ,[items]);
            $('.export-button').text('Exportar registros');
            $scope.isExporting = false;
          });
        }
      }

    };
    controller.$inject = ['$scope','$rootScope', '$timeout','DTOptionsBuilder','DTColumnBuilder','dialogService','$compile','$filter'];

    /** @ngInject */
    function tableList(){
      return {
        controller : controller,
        scope : {
          apiResource : '=',
          destroyFn: '=',
          editFn: '=',
          quickEdit: '=',
          columns: '=',
          actionUrl: '=',
          searchText: '@',
          orderBy: '@',
          filters: '=',
          exportQuery: '=',
          exportColumns: '='
        },
        templateUrl : 'app/main/directives/table-list/table-list.html'
      };
    }
})();
