angular
.module('app.directives')
.directive("excelReader", [function () {
  return {
    scope: {
      output: '='
    },
    link: function ($scope, $elm, $attrs) {

      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();
        
        reader.onload =function (evt) {
          $scope.$apply(function () {
            var data = evt.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            var headerNames = XLSX.utils.sheet_to_json(
                                workbook.Sheets[workbook.SheetNames[0]],
                                { header: 1 }
                              )[0];
            var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
            $scope.output = data;            
            $elm.val(null);
          });
        };
        
        reader.readAsBinaryString(changeEvent.target.files[0]);
      });

    }
  };
}]);