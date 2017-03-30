(function ()
{
    'use strict';

    angular
        .module('app.products.edit')
        .controller('ProductEditController', ProductEditController);

    /** @ngInject */
    function ProductEditController(
      dialogService, 
      commonService, 
      $stateParams, 
      $scope, 
      productService,
      categoriesService,
      fvService,
      Upload, 
      api, 
      $http, 
      $q, 
      $mdDialog, 
      $mdMedia
    ){
        var vm = this;
        vm.uploadFiles = uploadFiles;
        vm.removeFiles = removeFiles;
        vm.fileClass = fileClass;
        vm.updateIcon = updateIcon;
        vm.removeIcon = removeIcon;

        vm.selectColor = selectColor;


        vm.editSize = editSize;
        vm.addSize = addSize;
        vm.removeSize = removeSize;
        vm.openSizeForm = openSizeForm;
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
        vm.colorFilterId = '5743703aef7d5e62e508e22d';

        vm.normalFilters = [];
        vm.variantFilters = [];

        vm.openGroupForm = openGroupForm;
        vm.checkAllMark = checkAllMark;
        vm.getRelatedProducts = getRelatedProducts;

        vm.openBrandForm = openBrandForm;

        // Data
        vm.loading = [];
        //vm.product = Product.data;
        vm.dir = 'products/gallery';
        vm.api = api;
        vm.relatedProducts = [];


        vm.ensembles = [
          {value:'Se entrega totalmente ensamblado', label:'Se entrega totalmente ensamblado'},
          {value:'Requiere poco ensamble', label:'Requiere poco ensamble'},
          {value:'Requiere mucho ensamble', label:'Requiere mucho ensamble'},
        ];

        vm.groupTypes = commonService.getGroupTypes();

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

        vm.displays = commonService.getDisplays();

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
        vm.sas = commonService.getSocietiesHash();
        vm.selectedCategories = [];
        vm.deliveryTypes = commonService.getDeliveryTypes();
        
        var MATERIAL_FILTER_HANDLE = 'material';
        var LOCATION_FILTER_HANDLE = 'ubicacion-uso'; 
        var STYLE_FILTER_HANDLE = 'estilo';

        init();

        //Methods

        function init(){
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
            vm.product = formatProduct(vm.product);
            loadCategories();
            loadFilters();
            //loadBrands();
            loadCustomBrands();
            sortImages();
            getRelatedProducts(vm.product.SuppCatNum);
            vm.countries = commonService.getCountriesList();
          });
        }

        function formatProduct(product){
          if(!product.Seats){
            product.Seats = 0;
          }
          if(!product.Name){
            product.Name = product.ItemName;
          }
          if(!product.DetailedColor){
            product.DetailedColor = product.U_COLOR;
          }          
          return product;
        }

        function getRelatedProducts(SuppCatNum){
          productService.getProductsbySuppCatNum(SuppCatNum).then(function(res){
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
          if(form.$valid){
            vm.isLoading = true;
            vm.product.Categories = categoriesService.getSelectedCategories(vm.categoriesGroups,vm.selectedCategories);
            var selectedBrandSAP = _.findWhere(vm.brands, { ItmsGrpCod: vm.product.ItmsGrpCod});
            if(selectedBrandSAP){
              delete selectedBrandSAP.id;
            }
            var params = {
              Categories: vm.product.Categories,
              SA: vm.product.SA,
              productBrand: selectedBrandSAP,
              ItmsGrpCod: vm.product.ItmsGrpCod,
              CustomBrand: vm.product.CustomBrand,
              CheckedStructure: vm.product.CheckedStructure,
              freeSale: vm.product.freeSale,
              deliveryType: vm.product.deliveryType
            };
            
            if(params.freeSale){
              angular.extend(params,{
                freeSaleStock: vm.product.freeSaleStock,
                freeSaleDeliveryDays: vm.product.freeSaleDeliveryDays
              });
            }

            vm.displays.forEach(function(display){
              params[display.handle] = vm.product[display.handle];
            });

            productService.update(vm.product.ItemCode, params)
              .then(function(res){
                vm.isLoading = false;
                dialogService.showDialog('Datos actualizados');
              })
              .catch(function(err){
                vm.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');                
              });

          }else{
            var errors = [];
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
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
            productService.update(vm.product.ItemCode, params)
              .then(function(res){
                vm.isLoading = false;
                dialogService.showDialog('Datos actualizados');
              })
              .catch(function(err){
                vm.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');                
              });              
          }else{
            var errors = [];
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function updateFeatures(form){
          if(form.$valid){
            vm.isLoading = true;
            formatSelectedFilterValues();
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
            productService.update(vm.product.ItemCode, params)
              .then(function(res){
                vm.isLoading = false;
                dialogService.showDialog('Datos actualizados');
              })
              .catch(function(err){
                vm.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');                
              });              
          }else{
            var errors = [];
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function updatePackage(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              PackageContent: vm.product.PackageContent,
              CommercialPieces: vm.product.CommercialPieces || null,
              DeliveryPieces: vm.product.DeliveryPieces || null,
              Length: vm.product.Length || null,
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
            productService.update(vm.product.ItemCode, params)
              .then(function(res){
                vm.isLoading = false;
                dialogService.showDialog('Datos actualizados');
              })
              .catch(function(err){
                vm.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');                
              });              
          }else{
            var errors = [];
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function updateMedia(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              Video: vm.product.Video,
              CheckedPhotos: vm.product.CheckedPhotos,
              ImagesOrder: getImagesOrder(vm.product.files)
            };
            productService.update(vm.product.ItemCode, params)
              .then(function(res){
                vm.isLoading = false;
                dialogService.showDialog('Datos actualizados');
                console.log(res);
              })
              .catch(function(err){
                vm.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');                
              });              
          }else{
            var errors = [];
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }
        }

        function assignSelectedCategories(categoriesGroups, productCategories){
          var selectedCategories = [];
          for(var i=0;i<categoriesGroups.length;i++){
            selectedCategories[i] = [];
            for(var j=0;j<productCategories.length;j++){
              categoriesGroups[i] = categoriesGroups[i].map(function(category){
                if(productCategories[j].id == category.id){
                  selectedCategories[i].push(category.id);
                }
                return category;
              });
            }
          }
          return selectedCategories;
        }


        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            vm.categoriesGroups = res.data;
            vm.selectedCategories = assignSelectedCategories(
              vm.categoriesGroups,
              vm.product.Categories
            );
          });
        }

        function getSapBrand(brands, brandCode){
          var result = _.findWhere(brands,{ItmsGrpCod:brandCode});
          return result;
        }

        function loadBrands(){
          vm.brands = [];
          productService.getBrands()
            .then(function(res){
              vm.brands = res.data;
              vm.productBrandSap = getSapBrand(
                vm.brands,
                vm.product.ItmsGrpCod
              );
            })
            .catch(function(err){
              console.log(err);
            });
        }

        function loadCustomBrands(){
          vm.customBrands = [];
          productService.getCustomBrands()
            .then(function(res){
              vm.customBrands = res.data;
            })
            .catch(function(err){
              console.log(err);
            })
        }


        function getImagesOrder(images){
          var auxImages = [];
          images.forEach(function(image){
            if(auxImages.indexOf(image) < 0){
              auxImages.push(image.id);
            }
          });
          return auxImages;
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
              if( idsList.indexOf(file.id) < 0 ){
                orderedList.push(file);
              }
            });

            orderedList.concat(notSortedImages);
            vm.product.files = orderedList;
          }
        }

        function loadFilters(){
          productService.getAllFilters().then(function(res){
            vm.filters = res.data;
            vm.filters = fvService.sortFV(vm.filters);
            formatFiltersValues();
            vm.loadedFilters = true;
          });
        }

        function updateIcon($file) {
          console.log($file);
          var updateIconMethod = '/product/updateicon';

          if($file){
            vm.isLoadingAvatar = true;
            vm.uploadAvatar = Upload.upload({
              url: api.baseUrl + updateIconMethod,
              data: {
                id: vm.product.ItemCode,
                file: $file
              }
            }).then(
              function (resp) {
                console.log(resp);
                if(resp.data.icon_filename){
                  vm.product.icon_filename = resp.data.icon_filename;
                  vm.product.icon_name = resp.data.icon_name;
                  vm.product.icon_size = resp.data.icon_size;
                  vm.product.icon_type = resp.data.icon_type;
                  vm.product.icon_typebase = resp.data.icon_typebase;
                  //dialogService.showDialog('Imagen agregada');
                }else{
                  dialogService.showDialog('Error al subir archivo, intente de nuevo');
                }
                vm.isLoadingAvatar = false;
              }, 
              function (err) {
                console.log(err);
                vm.isLoadingAvatar = false;
                dialogService.showDialog('Error al subir archivo, intente de nuevo');
              }, 
              function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              }
            );
          }else{
            dialogService.showDialog('Error al subir archivo, intente de nuevo');
          }
        }

        function uploadFiles($files){
          vm.loading = [];
          vm.isLoadingFiles = true;
          var uid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          var addFilesMethod = '/product/addfiles';

          if($files && $files.length > 0){

            for(var i=0;i<$files.length;i++){

              var dataParams = {
                id: vm.product.ItemCode,
                uid:uid,
                index:0,
                file: $files[i]
              };
              var uploadParams = {
                url: api.baseUrl + addFilesMethod,
                data: dataParams
              };
              vm.upload = Upload.upload(uploadParams)
                .then(function (resp) {
                    console.log(resp);
                    var product = resp.data;
                    if(!product || !product.ItemCode){
                      return $q.reject();
                    }
                    vm.loading = [];
                    vm.isLoadingFiles = false;
                    vm.product.files = product.files;
                    //vm.product.ImagesOrder.push('new id');
                    sortImages();
                    //dialogService.showDialog('Imagenes guardadas');
                })
                .catch(function (err) {
                    console.log(err);
                    dialogService.showDialog('Hubo un error al subir las imagenes ' + (err || err.data));
                    vm.isLoadingFiles = false;
                })
                .finally(function(){}, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
          }
          else{
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
          var removeMethod = '/product/removefiles';
          var files = [];

          vm.product.files.forEach(function(file){
            if(file.selected){
              file.deleting = true;
              files.push(file);
            }
          });

          vm.product.removeFiles = files;
          vm.isLoadingFiles = true;

          var params = {
            method: 'POST', 
            url: api.baseUrl + removeMethod,
            data:vm.product
          };

          $http(params).then(function (resp){
              console.log(resp);
              vm.product.files = resp.data;
              vm.isLoadingFiles = false;
            })
            .catch(function(err){
              console.log('err', err);
              dialogService.showDialog('Hubo un error al eliminar los archivos ' + (err.data || err) );
              vm.isLoadingFiles = false;
              vm.product.files.forEach(function(file){
                if(file.selected) file.deleting = false;
              });
            });
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
              vm.counterColors = filter.selectedValues.length;
            }

          });
          vm.normalFilters = applyFiltersCustomOrder(vm.normalFilters);
        }

        function applyFiltersCustomOrder(filters){
          var materialFilter;
          var locationFilter;
          for(var i=0;i<filters.length;i++){
            if(filters[i].Handle === MATERIAL_FILTER_HANDLE){
              materialFilter = angular.copy(filters[i]);
            }
            if(filters[i].Handle === LOCATION_FILTER_HANDLE){
              locationFilter = angular.copy(filters[i]);
            }
          }
          filters = filters.filter(function(f){
            return f.Handle !== MATERIAL_FILTER_HANDLE &&  f.Handle !== LOCATION_FILTER_HANDLE;
          });

          filters.push(materialFilter);
          filters.push(locationFilter);
          return filters;
        }

        function removeIcon(){
          var params = {id: vm.product.ItemCode};
          vm.isLoadingAvatar = true;
          productService.removeIcon(params)
            .then(function(res){
              vm.isLoadingAvatar = false;
              var response = res.data;
              if(!response.icon_filename && response.ItemCode){
                vm.product.icon_filename = null;
                vm.product.icon_name = null;
                vm.product.icon_size = null;
                vm.product.icon_type = null;
                vm.product.icon_typebase = null;
                //dialogService.showDialog('Imagen eliminada');
              }else{
                $q.reject();
              }
            })
            .catch(function(err){
              console.log(err);
              vm.isLoadingAvatar = false;
              dialogService.showDialog('Hubo un error ' + (err.data || err) );
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
                  vm.product.FilterValues.push( val );
                }
              }
            }
          });
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
              product: vm.product.id,
              group: item.id
            };
            productService.addProductToGroup(params).then(function(res){
              console.log(res);
              vm.isLoadingGroups = false;
              vm.product.Groups.push(item);
            });
          }
        }

        function removeProductFromGroup(groupId, index){
          vm.isLoadingGroups = true;
          var params = {
            product: vm.product.id,
            group: groupId
          };
          productService.removeProductFromGroup(params)
            .then(function(res){
              vm.product.Groups.splice(index, 1);
              vm.isLoadingGroups = false;
            })
            .catch(function(err){
              console.log(err);
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
          vm.isLoadingSizes = true;
          size.ItemCode = vm.product.ItemCode;
          productService.createSize(size)
            .then(function(res){
              vm.product.Sizes.push(res.data);
              vm.isLoadingSizes = false;
            })
            .catch(function(err){
              console.log(err);
            })
        }

        function editSize(newData, size){
          vm.isLoadingSizes = true;
          productService.updateSize(size.id, newData)
            .then(function(res){
              size = res.data;
              vm.isLoadingSizes = false;
            })
            .catch(function(err){
              console.log(err);
            })
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
            vm.product.Sizes.splice(sizeIndex, 1);
          })
          .catch(function(err){
            console.log(err);
          })
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
