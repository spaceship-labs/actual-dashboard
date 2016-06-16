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
            {key:'ItemName', label:'Nombre'},
            {key:'Available', label:'Disponibles'},
            {key: 'SA', label: 'Sociedad'},
            {key:'productBrand.ItmsGrpNam', label:'Marca'},
            {key:'CheckedStructure', label:'Estructura', yesNo: true},
            {key:'CheckedDescription', label:'Contenido', yesNo: true},
            {key:'CheckedFeatures', label:'Caracteristicas', yesNo: true},
            {key:'CheckedPackage', label:'Empaque', yesNo: true},
            {key:'CheckedPhotos', label:'Fotos', yesNo: true},

        ];

        vm.sas = [
          {label:'Ninguno', value:'none'},
          {label:'Actual Studio', value:'Actual Studio'},
          {label:'Actual Home', value:'Actual Home'},
          {label:'Actual Kids', value:'Actual Kids'},
        ];

        productService.getBrands().then(function(res){
          vm.brands = res.data;
          vm.brands.unshift({ItmsGrpCod:'none', ItmsGrpNam:'Todas'})
        });

        vm.options = [
          {label:'Todos', value:'none'},
          {label:'Si', value:true},
          {label:'No', value:false}
        ];

        vm.filters = {
          SA: 'none',
          CheckedStructure: 'none',
          CheckedDescription: 'none',
          CheckedFeatures: 'none',
          CheckedPackage: 'none',
          CheckedPhotos: 'none'
        };

        function applyFilters(){
          var aux = {};
          for(var key in vm.filters){
            if(vm.filters[key] != 'none'){
              if(!isNaN(vm.filters[key])){
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

        // Methods
        //////////
    }

})();
