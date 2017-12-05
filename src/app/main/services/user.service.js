(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('userService', userService);

    /** @ngInject */
    function userService($http, $q, api){

      var service = {
        getList: getList,
        getUser: getUser,
        update: update,
        create: create,
        getSellers: getSellersUnselected,
        getAllModules: getAllModules
      };

      return service;

      function getList(page, params){
        var p = page || 1;
        var url = '/user/find/' + p;
        return api.$http.post(url,params);
      }

      function getUser(id){
        var url = '/user/findbyid/' + id;
        return api.$http.post(url);
      }

      function update(id, params){
        var url = '/user/update/' + id;
        return api.$http.post(url, params);
      }

      function create(params){
        var url = '/user/create/';
        return api.$http.post(url,params);
      }


      function getSellers(){
        var url = '/seller/getall/';
        return api.$http.post(url);
      }

      function getSellersUnselected(){
        var url = '/seller/getallunselected/';
        return api.$http.post(url);
      }

      function getAllModules(){
        var modules = [
          {key:'create-users', label:'Crear usuarios', section:'users'},
          {key:'edit-users', label:'Editar usuarios', section:'users'},
          {key:'list-users', label: 'Ver usuarios', section:'users'},
          {key:'close-quotations', label: 'Cerrar cotizaciones', section: 'quotations'},
          {key:'list-products', label:'Ver lista de productos', section:'products'},
          {key:'edit-products', label:'Editar productos', section:'products'},
          {key:'import-images', label:'Importar imagenes', section:'config'},
          {key:'config-sites', label:'Lista de configuración de sitios', section:'config'},
          {key:'config-sites-edit', label:'Configuración de sitio', section:'config'},
          {key:'config-delivery', label:'Configuración de envios', section:'config'},

          //{key:'config-sync', label:'Sinconizacion de productos', section:'config'},
          {key:'config-contability', label:'Configuración de contabilidad', section:'config'},
          {key:'list-leads', label:'Ver oportunidades', section:'leads'},
          {key:'create-brands', label:'Crear marcas', section:'brands'},
          {key:'edit-brands', label:'Editar marcas', section:'brands'},
          {key:'list-brands', label:'Ver marcas', section:'brands'},
          {key:'create-categories', label:'Crear categorias', section:'categories'},
          {key:'edit-categories', label:'Editar categorias', section:'categories'},
          {key:'list-categories', label:'Ver categorias', section:'categories'},
          {key:'create-filters', label:'Crear filtros', section:'filters'},
          {key:'edit-filters', label:'Editar filtros', section:'filters'},
          {key:'list-filters', label:'Ver filtros', section:'filters'},
          {key:'create-groups', label:'Crear agrupadores', section:'groups'},
          {key:'edit-groups', label:'Editar agrupadores', section:'groups'},
          {key:'list-groups', label:'Ver agrupadores', section:'groups'},
          {key:'spotlight-marketing', label:'Productos destacados', section:'marketing'},          
          {key:'slowmovement-marketing', label:'Productos de lento movimiento', section:'marketing'},          
          {key:'create-marketing', label:'Crear promociones', section:'marketing'},
          {key:'edit-marketing', label:'Editar promociones', section:'marketing'},
          {key:'list-marketing', label:'Ver promociones', section:'marketing'},
          {key:'edit-packages', label:'Editar paquetes', section:'marketing'},
          {key:'list-packages', label:'Ver paquetes', section:'marketing'},
          {key:'reports-commissions', label:'Reportes de comisiones', section:'commissions'},
          {key:'create-commissions', label:'Crear comisiones', section:'commissions'},
          {key:'edit-commissions', label:'Editar comisiones', section:'commissions'},
          {key:'list-commissions', label:'Ver comisiones', section:'commissions'},
          {key:'create-paymentmethods', label:'Crear vigencias de metodos de pago', section:'paymentmethods'},
          {key:'edit-paymentmethods', label:'Editar vigencias de metodos de pago', section:'paymentmethods'},
          {key:'list-paymentmethods', label:'Ver vigencias de metodos de pago', section:'paymentmethods'},

          {key:'create-users-web', label:'Crear usuarios web', section:'usersweb'},
          {key:'edit-users-web', label:'Editar usuarios web', section:'usersweb'},
          {key:'list-users-web', label: 'Ver usuarios web', section:'usersweb'},

        ];
        return modules;
      }
    }
})();
