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
        getFilters: getFilters,
        update: update,
        createCategory: createCategory,
        getMainCategories: getMainCategories,
        getAllCategories: getAllCategories,
        getCategoryById: getCategoryById,
        destroyCategorybyId: destroyCategorybyId,
        createFilter:createFilter,
        getFilterById: getFilterById,
        destroyFilterById: destroyFilterById,
        updateFilterById: updateFilterById
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

      function update(id, params){
        var url = '/product/update/' + id;
        return api.$http.post(url, params);
      }

      function createCategory(params){
        var url = '/productcategory/create';
        return api.$http.post(url, params);
      }

      function getCategories(page, params){
        var p = page || 1;
        var url = '/productcategory/find/' + p;
        return api.$http.post(url, params);
      }

      function getMainCategories(){
        var url = '/productcategory/getmaincategories';
        return api.$http.post(url);
      }

      function getAllCategories(){
        var url = '/productcategory/getallcategories';
        return api.$http.post(url);
      }

      function getCategoryById(id){
        var url = '/productcategory/findbyid/' + id;
        return api.$http.post(url);
      }

      function destroyCategorybyId(id){
        var url = '/productcategory/destroy/'+id;
        return api.$http.post(url);
      }


      function getFilters(page, params){
        var p = page || 1;
        var url = '/productfilter/find/' + p;
        return api.$http.post(url, params);
      }

      function createFilter(params){
        var url = '/productfilter/create/';
        return api.$http.post(url, params);
      }

      function getFilterById(id){
        var url = '/productfilter/findbyid/' + id;
        return api.$http.post(url);
      }

      function destroyFilterById(id){
        var url = '/productfilter/destroy/'+id;
        return api.$http.post(url);
      }

      function updateFilterById(id, params){
        var url = '/productfilter/update/' + id;
        return api.$http.post(url, params);
      }

    }


})();
