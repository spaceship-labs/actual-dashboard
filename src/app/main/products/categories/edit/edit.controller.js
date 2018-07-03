/** @ngInject */
function ProductCategoriesEditController($scope, $location, $rootScope ,$stateParams, $mdDialog, dialogService,productService, commonService, params){
    $scope.update = update;
    $scope.toggleCategory = toggleCategory;
    $scope.loadCategories = loadCategories;
    $scope.showDestroyDialog = showDestroyDialog;
    $scope.formatCategoryGroups = formatCategoryGroups;
    $scope.cancel = cancel;
    $scope.isLoading = false;
    $scope.destroyFn = productService.destroyCategorybyId;
    $scope.editRelations = editRelations;
    init();

    //Methods
    function cancel(){
      $mdDialog.cancel();
    }

    function editRelations(){
      $mdDialog.cancel();
      $location.path('products/categories/edit-relations/' + $scope.category.Handle);
    }


    function init(){
      productService.getCategoryById(params.id)
        .then(function(res){
          $scope.category = res.data;
          $scope.loadCategories();
        })
        .catch(function(err){
          console.log('err',err);
        })
    }

    function showDestroyDialog($ev){
      dialogService.showDestroyDialog(
        $ev, 
        $scope.destroyFn, 
        $scope.category.id,
        '/products/categories'
      );
    }

    function loadCategories(){
      productService.getCategoriesGroups()
      .then(function(res){
        console.log(res);
        $scope.categoriesGroups = res.data;
        formatCategoryGroups();
      })
      .catch(function(err){
        console.log('err', err);
      })
    }

    function formatCategoryGroups(){
      $scope.selectedCategories = [];
      for(var i=0;i<$scope.categoriesGroups.length;i++){
        $scope.selectedCategories[i] = [];
        //Hidding current category from options
        $scope.categoriesGroups[i] = $scope.categoriesGroups[i].filter(function(category){
          return category.id != $scope.category.id;
        });

        $scope.categoriesGroups[i] = $scope.categoriesGroups[i].map(function(category){
          for(var j=0;j<$scope.category.Parents.length;j++){
            if($scope.category.Parents[j].id === category.id){
              $scope.selectedCategories[i].push(category.id);
              console.log('categoria seleccionada : ' + category.Name);
              //category.selected = true;
            }
          }
          return category;
        });

      }
    }

    function update(form){
      if(form.$valid){
        $scope.category.Parents = [];
        $scope.isLoading = true;

        if($scope.category.CategoryLevel == 1){
          $scope.category.IsMain = true;
        }
        /*
        if($scope.category.IsMain){
          $scope.category.CategoryLevel = 1;
          $scope.category.Parents = [];
        }
        */

        for(var i=0;i<$scope.selectedCategories.length;i++){
          for(var j=0;j<$scope.selectedCategories[i].length;j++){
            $scope.category.Parents.push($scope.selectedCategories[i][j]);
          }
        }

        productService.updateCategory($scope.category.id,$scope.category)
          .then(function(res){
            console.log(res);
            $scope.isLoading = false;
            $rootScope.$emit('reloadTable', true);
            dialogService.showMessageDialog('Categoria actualizada');
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

    function toggleCategory(item, list){
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    }

}
