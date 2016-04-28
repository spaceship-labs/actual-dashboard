(function ()
{
    'use strict';

    angular
        .module('app.products.edit')
        .controller('ProductEditController', ProductEditController);

    /** @ngInject */
    function ProductEditController(dialogService, commonService, $stateParams, productService,Upload, api, $http){
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
        vm.loadColors = loadColors;
        vm.formatSelectedColors = formatSelectedColors;
        vm.formatColors = formatColors;
        vm.isLoading = false;

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
            vm.loadColors();
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

        function loadFilters(){
          productService.getAllFilters().then(function(res){
            console.log(res);
            vm.filters = res.data;
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
                    vm.product.files = resp.data.files;
                  }, function (err) {
                    console.log(err);
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

          $http({method: 'POST', url: api.baseUrl + vm.removeMethod,data:vm.product}).then(
            function (object){
              console.log(object);
              vm.product.files = object.data.files;
            },
            function(err){
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

        function loadColors(){
          productService.getColors().then(function(res){
            console.log(res);
            vm.colors = res.data;
            vm.formatColors();
          });
        }

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

    }
})();
