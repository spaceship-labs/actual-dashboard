    /** @ngInject */
    function ProductBrandCreateController($scope, $rootScope, $mdDialog, dialogService,productService, commonService){
        $scope.create = create;
        $scope.cancel = cancel;
        $scope.isLoading = false;
        $scope.brand = {};

        function cancel(){
          $mdDialog.cancel();
        }

        function create(form){
          if(form.$valid){
            $scope.isLoading = true;
            productService.createCustomBrand($scope.brand)
              .then(function(res){
                $scope.isLoading = false;
                $rootScope.$emit('reloadTable', true);
                dialogService.showMessageDialog('Marca creada');
                $mdDialog.hide();
              })
              .catch(function(err){
                console.log('err',err);
                dialogService.showMessageDialog('Hubo un error');
              });
          }
          else{
            dialogService.showMessageDialog('Campos incompletos');
          }
        }

        $scope.$watch('brand.Name', function(newVal, oldVal){
          if(newVal != oldVal){
            $scope.brand.Handle = commonService.formatHandle(newVal);
          }
        });

    }