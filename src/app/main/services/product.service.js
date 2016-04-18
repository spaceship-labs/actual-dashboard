(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('productService', productService);

    /** @ngInject */
    function productService($http, $q, api){

      var service = {
        getList: getList,
        getListNoImages: getListNoImages,
        getById: getById,
        search: search,
        getCategories: getCategories,
        update: update,

        //Categories
        createCategory: createCategory,
        updateCategory: updateCategory,
        destroyCategorybyId: destroyCategorybyId,
        getMainCategories: getMainCategories,
        getAllCategories: getAllCategories,
        getCategoryById: getCategoryById,
        getCategoriesGroups: getCategoriesGroups,


        //Filters
        getFilters: getFilters,
        createFilter:createFilter,
        getFilterById: getFilterById,
        destroyFilterById: destroyFilterById,
        updateFilterById: updateFilterById,
        getAllFilters: getAllFilters,

        //FilterValues
        updateFilterValue: updateFilterValue,
        createFilterValue: createFilterValue,
        destroyFilterValue: destroyFilterValue,

        //Materials
        getMaterials: getMaterials,
        updateMaterial: updateMaterial,
        destroyMaterial: destroyMaterial,
        createMaterial: createMaterial
      };

      return service;

      function getList(page, params){
        var p = page || 1;
        var url = '/product/find/' + p;
        return api.$http.post(url,params);
      }

      function getListNoImages(page, params){
        var p = page || 1;
        var url = '/product/find/' + p;
        params.noimages = true
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

      function getCategoriesGroups(){
        var url = '/productcategory/getcategoriesgroups';
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

      function updateCategory(id, params){
        var url = '/productcategory/update/' + id;
        return api.$http.post(url, params);
      }

      function getFilters(page, params){
        var p = page || 1;
        var url = '/productfilter/find/' + p;
        return api.$http.post(url, params);
      }

      function getAllFilters(){
        var url = '/productfilter/list/';
        return api.$http.post(url);
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

      function createFilterValue(params){
        var url = '/productfiltervalue/create/';
        return api.$http.post(url, params);
      }

      function destroyFilterValue(id){
        var url = '/productfiltervalue/destroy/'+id;
        return api.$http.post(url);
      }

      function updateFilterValue(id, params){
        var url = '/productfiltervalue/update/' + id;
        return api.$http.post(url, params);
      }

      function getMaterials(){
        var url = '/productmaterial/getall';
        return api.$http.post(url);
      }

      function createMaterial(params){
        var url = '/productmaterial/create/';
        return api.$http.post(url, params);
      }

      function updateMaterial(id, params){
        var url = '/productmaterial/update/' + id;
        return api.$http.post(url, params);
      }

      function destroyMaterial(id){
        var url = '/productmaterial/destroy/'+id;
        return api.$http.post(url);
      }


    }


})();
