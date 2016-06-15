(function ()
{
    'use strict';

    angular
        .module('app.products.list')
        .controller('ProductsListController', ProductsListController);

    /** @ngInject */
    function ProductsListController(productService)
    {
        var vm = this;
        // Data
        vm.columns = [
            //{key:'id', label:'ID'},
            {key:'Edit', label:'Editar', editUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'ItemCode', label:'Código', actionUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'ItemName', label:'Nombre'},
            {key:'Available', label:'Disponibles'},
            {key: 'SA', label: 'Sociedad'},
            {key:'CheckedStructure', label:'Estructura', yesNo: true},
            {key:'CheckedDescription', label:'Contenido', yesNo: true},
            {key:'CheckedFeatures', label:'Caracteristicas', yesNo: true},
            {key:'CheckedPackage', label:'Empaque y envío', yesNo: true},
            {key:'CheckedPhotos', label:'Fotos', yesNo: true},

        ];

        vm.apiResource = productService.getListNoImages;

        // Methods
        //////////
    }

})();
