(function ()
{
    'use strict';

    angular
        .module('app.products.list')
        .controller('ProductsListController', ProductsListController);

    /** @ngInject */
    function ProductsListController(productService, $rootScope, $scope)
    {
        var vm = this;
        vm.applyFilters = applyFilters;
        vm.finalFilters = {};
        // Data
        vm.columns = [
            //{key:'id', label:'ID'},
            {key:'Edit', label:'Editar', editUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'ItemCode', label:'Código', actionUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'Available', label:'Inventario'},
            {key:'ItemName', label:'Nombre'},
            //{key: 'SA', label: 'Sociedad'},
            //{key:'productBrand.ItmsGrpNam', label:'Marca'},
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
        vm.exportQuery += 'ItemName AS Nombre, Available AS Inventario, productBrand->ItmsGrpNam AS Marca,';
        //vm.exportQuery += ' SA AS Sociedad, yesNofn(CheckedStructure) AS Estructura, yesNofn(CheckedDescription) AS Contenido,';
        vm.exportQuery += ' nameSA AS Sociedad, yesNofn(CheckedStructure) AS Estructura, yesNofn(CheckedDescription) AS Contenido,';
        vm.exportQuery += ' yesNofn(CheckedFeatures) AS Caracteristicas, yesNofn(CheckedPackage) AS Empaque,';
        vm.exportQuery += ' yesNofn(icon_filename) AS Fotos, yesNofn(CheckedPhotos) AS Fotos_Revisadas, Active AS Almacen_Vendible';
        vm.exportQuery += ' INTO XLS("prods.xls",{headers:true}) FROM ?';

        /*
        vm.sas = [
          {label:'Ninguno', value:'none'},
          {label:'Actual Studio', value:'Actual Studio'},
          {label:'Actual Home', value:'Actual Home'},
          {label:'Actual Kids', value:'Actual Kids'},
        ];
        */

        //SA's from SAP
        vm.sas = [
          {label:'Ninguno', value:'none'},
          {label:'Actual Studio | 001', value:'001'},
          {label:'Actual Home | 002', value:'002'},
          {label:'Ambas | 003', value:'003'}
          //{label:'Actual Kids', value:'003'},
        ];

        /*
        productService.getBrands().then(function(res){
          vm.brands = res.data;
          vm.brands.unshift({ItmsGrpCod:'none', ItmsGrpNam:'Todas'})
        });
        */
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

        // Methods
        //////////
    }

})();
