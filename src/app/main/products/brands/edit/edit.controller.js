    /** @ngInject */
    function ProductBrandEditController($scope, $rootScope ,$stateParams, $mdDialog, dialogService,productService, commonService, params){
        $scope.update = update;
        $scope.showDestroyDialog = showDestroyDialog;
        $scope.cancel = cancel;
        $scope.isLoading = false;

        init();

        function cancel(){
          $mdDialog.cancel();
        }

        function init(){
          productService.getCustomBrandById(params.id)
            .then(function(res){
              $scope.brand = res.data;
            })
            .catch(function(err){
              console.log('err', err);
            })
        }

        function showDestroyDialog($ev){
          dialogService.showDestroyDialog($ev, $scope.destroyFn, $scope.brand.id, '/products/brands');
        }

        function update(form){
          if(form.$valid){
            $scope.isLoading = true;

            productService.updateCustomBrand($scope.brand.id,$scope.brand)
              .then(function(res){
                $scope.isLoading = false;
                $rootScope.$emit('reloadTable', true);
                dialogService.showMessageDialog('Marca actualizada');
                $mdDialog.hide();
              })
              .catch(function(err){
                console.log('err',err)
                dialogService.showMessageDialog('Hubo un error');
              })
          }
          else{
            dialogService.showMessageDialog('Campos incompletos');
          }
        }
    }
