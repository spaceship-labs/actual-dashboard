(function ()
{
    'use strict';

    angular
        .module('app.products.edit')
        .controller('ProductEditController', ProductEditController);

    /** @ngInject */
    function ProductEditController(dialogService, commonService, $stateParams, $scope, productService,Upload, api, $http, $q, $mdDialog, $mdMedia){
        var vm = this;
        vm.uploadFiles = uploadFiles;
        vm.removeFiles = removeFiles;
        vm.fileClass = fileClass;
        vm.updateIcon = updateIcon;
        vm.removeIcon = removeIcon;
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

        vm.loadBrands = loadBrands;
        vm.loadCustomBrands = loadCustomBrands;

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

        vm.updateConfig = updateConfig;
        vm.updateContent = updateContent;
        vm.updateFeatures = updateFeatures;
        vm.updatePackage = updatePackage;
        vm.updateMedia = updateMedia;

        vm.toggleColor = toggleColor;
        vm.isActiveColor = isActiveColor;

        vm.isLoading = false;
        vm.isLoadingFiles = false;
        vm.isLoadingGroups = false;

        vm.counterColors = 0;
        vm.colorFilter = false;

        vm.normalFilters = [];
        vm.variantFilters = [];

        vm.openGroupForm = openGroupForm;
        vm.checkAllMark = checkAllMark;
        vm.getRelatedProducts = getRelatedProducts;

        vm.openBrandForm = openBrandForm;

        // Data
        vm.loading = [];
        //vm.product = Product.data;
        vm.updateIconMethod = '/product/updateicon';
        vm.addMethod = '/product/addfiles';
        vm.removeMethod = '/product/removefiles';
        vm.dir = 'products/gallery';
        vm.api = api;
        vm.relatedProducts = [];


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
          {label:'Ninguno', handle:'Ninguno'},
          {label:'Actual Studio', handle:'Actual Studio'},
          {label:'Actual Home', handle:'Actual Home'},
          {label:'Actual Kids', handle:'Actual Kids'},
        ];

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

        vm.selectedCategories = [];

        vm.init();

        //Methods

        function init(){
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
            if(!vm.product.Seats){
              vm.product.Seats = 0;
            }

            if(!vm.product.Name){
              vm.product.Name = vm.product.ItemName;
            }

            if(!vm.product.DetailedColor){
              vm.product.DetailedColor = vm.product.U_COLOR;
            }

            vm.loadCategories();
            vm.loadFilters();
            //vm.loadColors();
            vm.loadBrands();
            vm.loadCustomBrands();
            vm.sortImages();
            vm.countries = commonService.getCountriesList();
            vm.getRelatedProducts(vm.product.SuppCatNum);
          });
        }

        function getRelatedProducts(SuppCatNum){
          productService.getProductsbySuppCatNum(SuppCatNum).then(function(res){
            console.log(res);
            vm.relatedProducts = res.data;
          });
        }

        function selectColor(colorValue){
          vm.colors.forEach(function(color){
            if(color.value === colorValue){
              vm.product.Color = colorValue;
            }
          });
        }

        function updateConfig(form){
          console.log(form);
          if(form.$valid){
            vm.isLoading = true;
            vm.groupSelectedCategories();

            var selectedBrandSAP = _.findWhere(vm.brands, { ItmsGrpCod: vm.product.ItmsGrpCod});
            delete selectedBrandSAP.id;
            console.log(selectedBrandSAP);

            var params = {
              Categories: vm.product.Categories,
              SA: vm.product.SA,
              //Brand: vm.product.Brand,
              productBrand: selectedBrandSAP,
              ItmsGrpCod: vm.product.ItmsGrpCod,
              CustomBrand: vm.product.CustomBrand,
              CheckedStructure: vm.product.CheckedStructure
            };
            vm.displays.forEach(function(display){
              params[display.handle] = vm.product[display.handle];
            });
            console.log(params);

            productService.update(vm.product.ItemCode, params).then(function(res){
              vm.isLoading = false;
              dialogService.showDialog('Datos actualizados');
              console.log(res);
            });

          }else{
            var errors = [];
            form.$error.required.forEach(function(err){
              errors.push(err.$name);
            });
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function updateContent(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              Name: vm.product.Name,
              Description: vm.product.Description,
              MainFeatures: vm.product.MainFeatures,
              Restrictions: vm.product.Restrictions,
              Conservation: vm.product.Conservation,
              CheckedDescription: vm.product.CheckedDescription
            };
            productService.update(vm.product.ItemCode, params).then(function(res){
              vm.isLoading = false;
              dialogService.showDialog('Datos actualizados');
              console.log(res);
            });
          }else{
            var errors = [];
            form.$error.required.forEach(function(err){
              errors.push(err.$name);
            });
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function updateFeatures(form){
          if(form.$valid){
            vm.isLoading = true;
            vm.formatSelectedFilterValues();
            var params = {
              FilterValues: vm.product.FilterValues,
              DetailedColor: vm.product.DetailedColor,
              GuaranteeText: vm.product.GuaranteeText,
              GuaranteeUnit: vm.product.GuaranteeUnit,
              GuaranteeUnitMsr: vm.product.GuaranteeUnitMsr,
              DesignedInCountry: vm.product.DesignedInCountry,
              MadeInCountry: vm.product.MadeInCountry,
              CheckedFeatures: vm.product.CheckedFeatures
            };
            productService.update(vm.product.ItemCode, params).then(function(res){
              vm.isLoading = false;
              dialogService.showDialog('Datos actualizados');
              console.log(res);
            });
          }else{
            var errors = [];
            form.$error.required.forEach(function(err){
              errors.push(err.$name);
            });
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function updatePackage(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              //Ensemble: vm.product.Ensemble,
              //EnsembleTime: vm.product.EnsembleTime,
              PackageContent: vm.product.PackageContent,
              CommercialPieces: vm.product.CommercialPieces,
              DeliveryPieces: vm.product.DeliveryPieces,
              Length: vm.product.Length,
              LengthUnitMsr: vm.product.LengthUnitMsr,
              Width: vm.product.Width || null,
              WidthUnitMsr: vm.product.WidthUnitMsr,
              Height: vm.product.Height || null,
              HeightUnitMsr: vm.product.HeightUnitMsr,
              Volume: vm.product.Volume || null,
              VolumeUnitMsr: vm.product.VolumeUnitMsr,
              Weight: vm.product.Weight || null,
              WeightUnitMsr: vm.product.WeightUnitMsr,

              ChairBackHeight: vm.product.ChairBackHeight || null,
              ChairBackHeightUnitMsr: vm.product.ChairBackHeightUnitMsr,
              SeatHeight: vm.product.SeatHeight || null,
              SeatHeightUnitMsr: vm.product.SeatHeightUnitMsr,
              ArmRestHeight: vm.product.ArmRestHeight || null,
              ArmRestHeightUnitMsr: vm.product.ArmRestHeightUnitMsr,
              Depth: vm.product.Depth || null,
              DepthUnitMsr: vm.product.DepthUnitMsr,

              CheckedPackage: vm.product.CheckedPackage

            };
            productService.update(vm.product.ItemCode, params).then(function(res){
              vm.isLoading = false;
              dialogService.showDialog('Datos actualizados');
              console.log(res);
            });
          }else{
            var errors = [];
            form.$error.required.forEach(function(err){
              errors.push(err.$name);
            });
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function updateMedia(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              //icon_description: vm.product.icon_description,
              Video: vm.product.Video,
              CheckedPhotos: vm.product.CheckedPhotos
            };
            productService.update(vm.product.ItemCode, params).then(function(res){
              vm.isLoading = false;
              dialogService.showDialog('Datos actualizados');
              console.log(res);
            });
          }else{
            var errors = [];
            form.$error.required.forEach(function(err){
              errors.push(err.$name);
            });
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }


        //Update global (SIN USO POR EL MOMENTO)
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
          for(var i=0; i<vm.categoriesGroups.length; i++){
            console.log('selectedCategories'+i , vm.selectedCategories[i]);
            vm.product.Categories = vm.product.Categories.concat(vm.selectedCategories[i]);
          }
          console.log(vm.product.Categories);
        }

        function formatCategoryGroups(){
          for(var i=0;i<vm.categoriesGroups.length;i++){
            vm.selectedCategories[i] = [];

            for(var j=0;j<vm.product.Categories.length;j++){
              vm.categoriesGroups[i] = vm.categoriesGroups[i].map(function(category){
                if(vm.product.Categories[j].id == category.id){
                  vm.selectedCategories[i].push(category.id);
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
          vm.brands = [];

          productService.getBrands().then(function(res){
            console.log(res);
            vm.brands = res.data;
            vm.productBrandSap = getSapBrand(vm.product.ItmsGrpCod);
            console.log(vm.productBrandSap);
          });

        }

        function loadCustomBrands(){
          vm.customBrands = [];
          productService.getCustomBrands().then(function(res){
            console.log(res);
            vm.customBrands = res.data;
          });
        }

        function sortFiltersValues(){
          vm.filters.forEach(function(filter){
            if(filter.ValuesOrder){
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
                //Fixes values order missmatch
                if(newArr.length > 0){
                  filter.Values = newArr;
                }
              }
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
          var idsList = vm.product.ImagesOrder ? vm.product.ImagesOrder.split(',') : [];
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
            vm.loadedFilters = true;

          });
        }

        function updateIcon($file) {
          console.log($file);
          if($file){
            vm.isLoadingAvatar = true;
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
                }else{
                  alert('Error al subir archivo, intente de nuevo');
                }
                vm.isLoadingAvatar = false;
              }, function (err) {
                console.log(err);
                vm.isLoadingAvatar = false;
              }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
          }else{
            alert('Error al subir archivo, intente de nuevo');
          }
        }

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
          }else{
            vm.isLoadingFiles = false;
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
          var variantFiltersHandles = ['tamano-blancos','forma','firmeza','color'];

          vm.filters.forEach(function(filter){
            filter.selectedValues = [];
            filter.Values.forEach(function(value ,indexValue){
              vm.product.FilterValues.forEach(function(productVal, index){

                if(productVal.id == value.id){
                  if(filter.IsMultiple){
                      filter.selectedValues.push(productVal.id);
                      //value.selected = true;
                  }
                  else{
                    filter.selectedValue = indexValue;
                  }
                }
              });
            });

            if( variantFiltersHandles.indexOf(filter.Handle) >= 0){
              vm.variantFilters.push(filter);
            }else{
              vm.normalFilters.push(filter);
            }


            if(filter.Handle === 'color'){
              //vm.colorFilter = filter;
              vm.counterColors = filter.selectedValues.length;
            }

          });
        }

        function removeIcon(){
          var params = {id: vm.product.ItemCode};
          vm.isLoadingAvatar = true;
          productService.removeIcon(params).then(function(res){
            console.log(res);
            vm.isLoadingAvatar = false;
            if(!res.data.icon_filename){
              vm.product.icon_filename = null;
              vm.product.icon_name = null;
              vm.product.icon_size = null;
              vm.product.icon_type = null;
              vm.product.icon_typebase = null;
            }
          });
        }

        function formatSelectedFilterValues(){
          vm.product.FilterValues = [];
          vm.normalFilters.forEach(function(filter){
            if(filter.IsMultiple){
              vm.product.FilterValues = vm.product.FilterValues.concat(filter.selectedValues);
            }
            else{
              if(filter.selectedValue){
                var val = filter.Values[filter.selectedValue];
                if(val){
                  //console.log('pushing value: ', val);
                  vm.product.FilterValues.push( val );
                }
              }
            }
          });
          vm.variantFilters.forEach(function(filter){
            if(filter.IsMultiple){
              vm.product.FilterValues = vm.product.FilterValues.concat(filter.selectedValues);
            }
            else{
              if(filter.selectedValue){
                var val = filter.Values[filter.selectedValue];
                if(val){
                  //console.log('pushing value: ', val);
                  vm.product.FilterValues.push( val );
                }
              }
            }
          });

          //console.log(vm.product.FilterValues);
        }

        function toggleColor(colorId, filter){
          if(filter.selectedValues){
            var index = filter.selectedValues.indexOf(colorId);
            if(index > -1){
              filter.selectedValues.splice(index, 1);
              if(vm.counterColors > 0){
                vm.counterColors--;
              }
            }
            else if(vm.counterColors < 4){
              filter.selectedValues.push(colorId);
              vm.counterColors++;
            }
          }
        }

        function isActiveColor(colorId, filter){
          if(filter.selectedValues){
            var index = filter.selectedValues.indexOf(colorId);
            return (index > -1);
          }else{
            return false;
          }
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
              //product: vm.product.ItemCode,
              product: vm.product.id,
              group: item.id
            };
            productService.addProductToGroup(params).then(function(res){
              console.log(res);
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
            product: vm.product.id,
            group: groupId
          };
          productService.removeProductFromGroup(params).then(function(res){
            console.log(res);
            vm.product.Groups.splice(index, 1);
            vm.isLoadingGroups = false;
          });
        }


        function checkAllMark(display){
          if(display){
            vm.toggleAllDisplays = false;
          }
        }


        $scope.$watch('vm.toggleAllDisplays', function(newVal, oldVal){
          if(newVal != oldVal && newVal == true){
            vm.displays.forEach(function(display){
              vm.product[display.handle] = newVal;
            });
          }
        });


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
        }



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


        function openGroupForm(ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: GroupFormController,
            templateUrl: 'app/main/products/edit/group-form.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
          })
          .then(function(newData) {
            productService.createGroup(newData).then(function(res){
              console.log(res);
              dialogService.showDialog('Agrupador creado');
            });
          }, function() {
            console.log('You cancelled the dialog.');
          });
        }

        function GroupFormController($scope, commonService){
          $scope.group = {};
          $scope.cancel = function(){ $mdDialog.cancel(); };
          $scope.submit = function(size){ $mdDialog.hide(size); };
          $scope.$watch('group.Name', function(newVal, oldVal){
            if(newVal != oldVal){
              $scope.group.Handle = commonService.formatHandle(newVal);
            }
          });

          $scope.types = [
            {label:'Agrupador Variaciones', handle:'variations'},
            //{label:'Agrupador Ambientes', handle:'environments'},
            //{label:'Agrupador Paquetes', handle:'packages'},
            {label:'Agrupador Relaciones', handle:'relations'},

          ];
        }


        //BRAND SECTION
        function openBrandForm(ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: BrandFormController,
            templateUrl: 'app/main/products/edit/brand-form.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
          })
          .then(function(newData) {
            productService.createCustomBrand(newData).then(function(res){
              console.log(res);
              var createdBrand = res.data;
              if(createdBrand && createdBrand.id){
                vm.customBrands.push(res.data);
              }
              dialogService.showDialog('Marca creada');
            });
          }, function() {
            console.log('You cancelled the dialog.');
          });
        }

        function BrandFormController($scope, commonService){
          $scope.brand = {};
          $scope.$watch('brand.Name', function(newVal, oldVal){
            if(newVal != oldVal){
              $scope.brand.Handle = commonService.formatHandle(newVal);
            }
          });
          $scope.cancel = function(){ $mdDialog.cancel(); };
          $scope.submit = function(size){ $mdDialog.hide(size); };
        }



    }
})();
