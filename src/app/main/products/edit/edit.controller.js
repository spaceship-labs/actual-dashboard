(function ()
{
    'use strict';

    angular
        .module('app.products.edit')
        .controller('ProductEditController', ProductEditController);

    /** @ngInject */
    function ProductEditController(dialogService, commonService, $stateParams, productService,Upload, api, $http, $q, $mdDialog, $mdMedia){
        var vm = this;
        vm.uploadFiles = uploadFiles;
        vm.removeFiles = removeFiles;
        vm.fileClass = fileClass;
        vm.updateIcon = updateIcon;
        vm.init = init;
        vm.update = update;
        vm.loadCategories = loadCategories;
        vm.formatCategoryGroups = formatCategoryGroups;
        vm.groupSelectedCategories = groupSelectedCategories;
        vm.selectColor = selectColor;
        vm.loadFilters = loadFilters;
        vm.formatFiltersValues = formatFiltersValues;
        vm.formatSelectedFilterValues = formatSelectedFilterValues;
        //vm.loadColors = loadColors;

        //BRANDS
        vm.loadBrands = loadBrands;
        vm.formatSelectedColors = formatSelectedColors;
        vm.formatColors = formatColors;
        vm.editSize = editSize;
        vm.addSize = addSize;
        vm.removeSize = removeSize;
        vm.openSizeForm = openSizeForm;
        vm.sortFiltersValues = sortFiltersValues;
        vm.getImagesOrder = getImagesOrder;
        vm.sortImages = sortImages;
        vm.queryGroups = queryGroups;
        vm.selectedGroupChange = selectedGroupChange;
        vm.removeProductFromGroup = removeProductFromGroup;
        vm.isLoading = false;
        vm.isLoadingFiles = false;
        vm.isLoadingGroups = false;

        // Data
        vm.loading = [];
        //vm.product = Product.data;
        vm.updateIconMethod = '/product/updateicon';
        vm.addMethod = '/product/addfiles';
        vm.removeMethod = '/product/removefiles';
        vm.dir = 'products/gallery';
        vm.api = api;


        vm.ensembles = [
          {value:'Se entrega totalmente ensamblado', label:'Se entrega totalmente ensamblado'},
          {value:'Requiere poco ensamble', label:'Requiere poco ensamble'},
          {value:'Requiere mucho ensamble', label:'Requiere mucho ensamble'},
        ];

        vm.groupTypes = {
          'variations': 'Agrupador Variaciones',
          'environments': 'Agrupador Ambientes',
          'packages': 'Agrupador Paquetes',
          'relations': 'Agrupador Relaciones'
        };

        vm.colors = [
          {label:'Rojo',value:'rojo',code:'#CC0000'},
          {label:'Naranja',value:'naraja',code:'#FB940B'},
          {label:'Amarillo',value:'amarillo',code:'#FFFF00'},
          {label:'Verde',value:'verde',code:'#00CC00'},
          {label:'Turquesa',value:'turquesa',code:'#03C0C6'},
          {label:'Azul',value:'azul',code:'#0000FF'},
          {label:'Morado',value:'morado',code:'#762CA7'},
          {label:'Rosa',value:'rosa',code:'#FF98BF'},
          {label:'Blanco',value:'blanco',code:'#FFFFFF'},
          {label:'Negro',value:'negro',code:'#000000'},
          {label:'Gris',value:'gris',code:'#999999'},
          {label:'Cafe',value:'cafe',code:'#885418'},
        ];


        vm.displays = [
          {label:'Ventas Offline', handle:'OnOffline'},
          {label:'Actual Studio (actualstudio.com) ', handle:'OnStudio'},
          {label:'Actual Home (actualhome.com)', handle:'OnHome'},
          {label:'Actual Kids (actualkids.com)', handle:'OnKids'},
          {label:'Amueble.com', handle:'OnAmueble'},
        ];

        vm.companies = [
          {label:'Ninguno', handle:'none'},
          {label:'Actual Studio', handle:'Actual Studio'},
          {label:'Actual Home', handle:'Actual Home'},
          {label:'Actual Kids', handle:'Actual Kids'},
        ];

        console.log(vm.companies);

        vm.guarenteeUnits = [
          {label:'Año(s)', value:'YEAR'},
          {label:'Meses', value: 'MONTH'}
        ];

        vm.ensembleTimes = [
          {label:'menor a 15 minutos', value:'15min<'},
          {label:'15 a 30 minutos', value:'15min-30min'},
          {label:'30 a 60 minutos', value:'30min-60min<'},
          {label:'mayor a una hora', value:'>1hr'},

        ];


        vm.init();

        //Methods

        function init(){
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
            if(!vm.product.Seats){
              vm.product.Seats = 0;
            }
            vm.loadCategories();
            vm.loadFilters();
            //vm.loadColors();
            vm.loadBrands();
            vm.sortImages();
            vm.countries = commonService.getCountriesList();
          });
        }

        function selectColor(colorValue){
          vm.colors.forEach(function(color){
            if(color.value === colorValue){
              vm.product.Color = colorValue;
            }
          });
        }

        function update(form){
          if(form.$valid){
            vm.isLoading = true;
            vm.groupSelectedCategories();
            vm.formatSelectedFilterValues();
            vm.formatSelectedColors();
            vm.getImagesOrder();
            console.log(vm.product);
            productService.update(vm.product.ItemCode, vm.product)
              .then(function(res){
                vm.isLoading = false;
                dialogService.showDialog('Datos actualizados');
                console.log(res);
              });
          }
          else{
            dialogService.showDialog('Campos incompletos');
          }
        }

        function groupSelectedCategories(){
          vm.product.Categories = [];
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.categoriesGroups[i].length;j++){
              if(vm.categoriesGroups[i][j].selected){
                vm.product.Categories.push(vm.categoriesGroups[i][j]);
              }
            }
          }
        }

        function formatCategoryGroups(){
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.product.Categories.length;j++){
              vm.categoriesGroups[i] = vm.categoriesGroups[i].map(function(category){
                if(vm.product.Categories[j].id == category.id){
                  category.selected = true;
                }
                return category;
              });
            }
          }
        }


        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            console.log(res);
            vm.categoriesGroups = res.data;
            vm.formatCategoryGroups();
          });
        }

        function getSapBrand(brandCode){
          var result = false;
          vm.brands.forEach(function(brand){
            if(brand.ItmsGrpCod == brandCode){
              result = brand;
            }
          });
          return result;
        }

        function loadBrands(){
          console.log('loading brands');
          productService.getBrands().then(function(res){
            console.log(res);
            vm.brands = res.data;
            vm.productBrandSap = getSapBrand(vm.product.ItmsGrpCod);
          });
        }

        function sortFiltersValues(){
          vm.filters.forEach(function(filter){
            var idsList = filter.ValuesOrder.split(',');

            if(idsList.length > 0 && filter.ValuesOrder){
              var baseArr = angular.copy(filter.Values);
              var newArr = [];
              idsList.forEach(function(id){
                baseArr.forEach(function(val){
                  if(val.id == id){
                    newArr.push(val);
                  }
                })
              });
              filter.Values = newArr;
            }
          });
        }

        function getImagesOrder(){
          vm.product.ImagesOrder =  [];
          vm.product.files.forEach(function(file){
            vm.product.ImagesOrder.push(file.id);
          });
        }

        function sortImages(){
          var idsList = vm.product.ImagesOrder.split(',');
          var notSortedImages = [];
          var found = false;

          if(idsList.length > 0 && vm.product.ImagesOrder){
            var baseArr = angular.copy(vm.product.files);
            var orderedList = [];
            idsList.forEach(function(id){
              baseArr.forEach(function(file){
                if(file.id == id){
                  orderedList.push(file);
                }
              });
            });

            //Checking if a file was not in the orderedList
            baseArr.forEach(function(file){
              if( !_.where(orderedList, {id: file.id}) ){
                orderedList.push(file);
              }
            });
            /*
            baseArr.forEach(function(val){
              idsList.forEach(function(id){
                if(val.id == id){
                  newArr.push(val);
                  found = true;
                }
              });
              if(!found){
                notSortedImages.push(val);
              }
            });
            */

            console.log(orderedList);
            orderedList.concat(notSortedImages);
            vm.product.files = orderedList;
          }
        }

        function loadFilters(){
          productService.getAllFilters().then(function(res){
            //console.log(res);
            vm.filters = res.data;
            vm.sortFiltersValues();
            vm.formatFiltersValues();
          });
        }

        function updateIcon($file) {
          console.log($file);
          vm.loadingAvatar = true;
          vm.uploadAvatar = Upload.upload({
            url: api.baseUrl + vm.updateIconMethod,
            data: {
              id: vm.product.ItemCode,
              file: $file
            }
          }).then(function (resp) {
              console.log(resp);
              if(resp.data.icon_filename){
                vm.product.icon_filename = resp.data.icon_filename;
                vm.product.icon_name = resp.data.icon_name;
                vm.product.icon_size = resp.data.icon_size;
                vm.product.icon_type = resp.data.icon_type;
                vm.product.icon_typebase = resp.data.icon_typebase;
              }
              vm.loadingAvatar = false;
            }, function (err) {
              console.log(err);
              vm.loadingAvatar = false;
            }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };

        function uploadFiles($files){
          //console.log($files);
          vm.loading = [];
          vm.isLoadingFiles = true;
          var uid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

          if($files && $files.length > 0){

            for(var i=0;i<$files.length;i++){
              vm.loading.push($files[i]);

              vm.upload = Upload.upload({
                url: api.baseUrl + vm.addMethod,
                data: {
                  id: vm.product.ItemCode,
                  uid:uid,
                  index:0,
                  file: $files[i]
                },
                }).then(function (resp) {
                    console.log(resp);
                    vm.loading = [];
                    vm.isLoadingFiles = false;
                    vm.product.files = resp.data;
                    //vm.product.ImagesOrder.push('new id');
                    vm.sortImages();
                  }, function (err) {
                    console.log(err);
                    vm.isLoadingFiles = false;
                  }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
          }
        }

        function fileClass(file){
          var c = '';
          if(file.selected) c += "selected ";
          if(file.deleting) c += "deleting ";
          if(file == vm.selectedFile) c+= "selected-item ";
          return c;
        }

        function removeFiles(){

          var files = [];
          vm.product.files.forEach(function(file){
            if(file.selected){
              file.deleting = true;
              files.push(file);
            }
          });

          vm.product.removeFiles = files;
          vm.isLoadingFiles = true;

          $http({method: 'POST', url: api.baseUrl + vm.removeMethod,data:vm.product}).then(
            function (resp){
              console.log(resp);
              vm.product.files = resp.data;
              vm.isLoadingFiles = false;
            },
            function(err){
              vm.isLoadingFiles = false;
              vm.product.files.forEach(function(file){
                if(file.selected) file.deleting = false;
              });
            }
          );

        }


        function formatFiltersValues(){
          vm.filters.forEach(function(filter){
            filter.Values.forEach(function(value){
              vm.product.FilterValues.forEach(function(productVal, index){

                if(productVal.id == value.id){
                  if(filter.IsMultiple){
                      value.selected = true;
                  }
                  else{
                    filter.selectedValue = index;
                  }
                }
              });
            });
          });
        }

        /*
        function loadColors(){
          productService.getColors().then(function(res){
            //console.log(res);
            vm.colors = res.data;
            vm.formatColors();
          });
        }
        */

        function formatSelectedColors(){
          vm.product.Colors = [];
          vm.colors.forEach(function(color){
            if(color.selected){
              vm.product.Colors.push(color.id);
            }
          });
        }

        function formatColors(){
          vm.product.Colors.forEach(function(productColor){
            vm.colors.forEach(function(color){
              if(color.id == productColor.id){
                color.selected = true;
              }
            });
          });
        }

        function formatSelectedFilterValues(){
          vm.product.FilterValues = [];
          vm.filters.forEach(function(filter){
            if(filter.IsMultiple){
              filter.Values.forEach(function(value){
                if(value.selected){
                  vm.product.FilterValues.push(value);
                }
              });
            }
            else{
              if(filter.selectedValue){
                var val = filter.Values[filter.selectedValue];
                vm.product.FilterValues.push( val );
              }
            }
          });
        }

        /*----------------/
          #GROUPS
        /*---------------*/

        function queryGroups(term){
          console.log(term);
          if(term != '' && term){
            var deferred = $q.defer();
            var params = {term: term, autocomplete: true};
            productService.searchGroups(params).then(function(res){
              console.log(res);
              deferred.resolve(res.data.data);
            });
            return deferred.promise;
          }
          else{
            return [];
          }
        }

        function selectedGroupChange(item){
          if(item && item.id){
            vm.selectedGroup = null;
            vm.searchGroupText = null;
            vm.isLoadingGroups = true;
            var params = {
              product: vm.product.ItemCode,
              group: item.id
            };
            productService.addProductToGroup(params).then(function(res){
              vm.isLoadingGroups = false;
              vm.product.Groups.push(item);
            });
            //$mdAutocomplete.clear();
          }
          //vm.selectedProduct = undefined;
          //vm.searchText = '';
        }

        function removeProductFromGroup(groupId, index){
          vm.isLoadingGroups = true;
          var params = {
            product: vm.product.ItemCode,
            group: groupId
          };
          productService.removeProductFromGroup(params).then(function(res){
            console.log(res);
            vm.product.Groups.splice(index, 1);
            vm.isLoadingGroups = false;
          });
        }


        /*-------------------/
          #SIZES-FORM
        /*-------------------*/

        function addSize(size){
          //console.log(vm.product.Sizes);
          vm.isLoadingSizes = true;
          size.ItemCode = vm.product.ItemCode;
          productService.createSize(size).then(function(res){
            //console.log(res);
            vm.product.Sizes.push(res.data);
            vm.isLoadingSizes = false;
          });
        }

        function editSize(newData, size){
          //console.log(size);
          vm.isLoadingSizes = true;
          productService.updateSize(size.id, newData).then(function(res){
            //console.log(res);
            size = res.data;
            vm.isLoadingSizes = false;
          });
        }

        function removeSize($ev,sizeId, sizeIndex){
          var hasRedirect = false;
          var isPromise = true;
          dialogService.showDestroyDialog(
            $ev,
            productService.destroySize,
            sizeId,
            hasRedirect,
            isPromise,
            vm.isLoadingSizes
          ).then(function(res){
            //console.log(res);
            vm.product.Sizes.splice(sizeIndex, 1);
          });
        }

        function openSizeForm(ev, action, size) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          var params = {
            size: size,
            action: action
          };
          $mdDialog.show({
            controller: SizeFormController,
            templateUrl: 'app/main/products/edit/size-form.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
            locals: params
          })
          .then(function(newData) {
            if(action === 'add'){
              vm.addSize(newData);
            }
            else if(action === 'edit'){
              vm.editSize(newData, size);
            }
          }, function() {
            console.log('You cancelled the dialog.');
          });
        };



        function SizeFormController($scope, commonService, size, action){
          $scope.size = size || {};
          $scope.action = action || 'add';
          $scope.actionLabel = 'Crear';
          if($scope.action === 'edit'){
            $scope.actionLabel = 'Editar';
          }
          $scope.cancel = function(){ $mdDialog.cancel(); };
          $scope.submit = function(size){ $mdDialog.hide(size); };

        }

    }
})();
