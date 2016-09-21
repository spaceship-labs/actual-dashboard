(function ()
{
    'use strict';

    angular
        .module('app.products.list')
        .controller('ProductsListController', ProductsListController);

    /** @ngInject */
    function ProductsListController(productService, commonService, $rootScope, $scope)
    {
        var vm = this;
        vm.applyFilters = applyFilters;
        vm.finalFilters = {};
        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'ItemCode', label:'Código', actionUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'Available', label:'Inventario'},
            {key:'ItemName', label:'Nombre'},
            {key:'nameSA', label:'Sociedad'},
            {key:'CustomBrand.Name', label:'Marca'},
            {key:'CheckedStructure', label:'Estructura', yesNo: true},
            {key:'CheckedDescription', label:'Contenido', yesNo: true},
            {key:'CheckedFeatures', label:'Caracteristicas', yesNo: true},
            {key:'CheckedPackage', label:'Empaque', yesNo: true},
            {key:'CheckedPhotos', label:'Fotos', yesNo: true},
            //{key:'Active', label:'A. Vendible'},
        ];

        alasql.fn.yesNofn = function(col){
          if(col){
            return 'Si';

          }else if(col == false || typeof col == undefined || col == null){
            return 'No';
          }
          return col;
        }

        vm.exportQuery = 'SELECT ItemCode AS Codigo,';
        vm.exportQuery += 'ItemName AS Nombre, Available AS Inventario, CustomBrand->Name AS Marca,';
        //vm.exportQuery += ' SA AS Sociedad, yesNofn(CheckedStructure) AS Estructura, yesNofn(CheckedDescription) AS Contenido,';
        vm.exportQuery += ' nameSA AS Sociedad, yesNofn(CheckedStructure) AS Estructura, yesNofn(CheckedDescription) AS Contenido,';
        vm.exportQuery += ' yesNofn(CheckedFeatures) AS Caracteristicas, yesNofn(CheckedPackage) AS Empaque,';
        vm.exportQuery += ' yesNofn(icon_filename) AS Fotos, yesNofn(CheckedPhotos) AS Fotos_Revisadas, Active AS Almacen_Vendible';
        vm.exportQuery += ' INTO XLS("prods.xls",{headers:true}) FROM ?';

        //SA's from SAP
        vm.sas = commonService.getSocieties();

        productService.getCustomBrands().then(function(res){
          vm.brands = res.data;
          vm.brands.unshift({id:'none', Name:'Todas'})
        });

        vm.options = [
          {label:'Todos', value:'none'},
          {label:'Si', value:true},
          {label:'No', value:false}
        ];

        vm.activeOptions = [
          {label:'Todos', value:'none'},
          {label:'Si', value:'Y'},
          {label:'No', value:'N'}
        ]

        vm.filters = {
          //SA: 'none',
          U_Empresa: 'none',
          CheckedStructure: 'none',
          CheckedDescription: 'none',
          CheckedFeatures: 'none',
          CheckedPackage: 'none',
          CheckedPhotos: 'none',
          Active: 'Y'
        };

        function applyFilters(){
          var aux = {};
          for(var key in vm.filters){
            if(vm.filters[key] != 'none'){
              if(!isNaN(vm.filters[key]) && key !== 'U_Empresa'){
                aux[key] = parseFloat(vm.filters[key]);
              }else{
                aux[key] = vm.filters[key];
              }
            }
          }
          vm.finalFilters = aux;
          $rootScope.$broadcast('reloadTable', true);
        }
        vm.apiResource = productService.getListNoImages;

        vm.applyFilters();
    }

})();
