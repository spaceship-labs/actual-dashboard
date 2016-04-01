(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('productService', productService);

    /** @ngInject */
    function productService($http, $q, api){

      var service = {
        getList: getList,
        getById: getById,
        search: search,
        getCategories: getCategories,
        getFilters: getFilters
      };

      return service;

      function getList(page, params){
        var p = page || 1;
        var url = '/product/find/' + p;
        return api.$http.post(url,params);
      }

      function getById(id){
        var url = '/product/findbyid/' + id;
        return api.$http.post(url);
      }

      function search(id){
        var url = '/product/search/';
        return api.$http.post(url);
      }

      function getCategories(page, params){
        var p = page || 1;
        var url = '/productcategory/find/' + p;
        return api.$http.post(url, params);
      }

      function getFilters(page, params){
        var p = page || 1;
        var url = '/productfilter/find/' + p;
        return api.$http.post(url, params);
      }


    }


})();
