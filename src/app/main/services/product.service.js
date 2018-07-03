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
        removeIcon: removeIcon,
        getProductsbySuppCatNum: getProductsbySuppCatNum,
        advancedSearch: advancedSearch,

        //Categories
        createCategory: createCategory,
        updateCategory: updateCategory,
        destroyCategorybyId: destroyCategorybyId,
        getMainCategories: getMainCategories,
        getAllCategories: getAllCategories,
        getCategoryById: getCategoryById,
        getCategoriesGroups: getCategoriesGroups,
        getCategoryChildsRelations: getCategoryChildsRelations,
        setCategoryChildsRelations: setCategoryChildsRelations,

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

        //Sizes
        updateSize: updateSize,
        createSize: createSize,
        destroySize: destroySize,

        //Colors
        getColors: getColors,

        //Brands
        getBrands: getBrands,
        getCustomBrands: getCustomBrands,
        createCustomBrand: createCustomBrand,
        findCustomBrands: findCustomBrands,
        destroyCustomBrand: destroyCustomBrand,
        updateCustomBrand: updateCustomBrand,
        getCustomBrandById: getCustomBrandById,


        //Groups
        getGroupById: getGroupById,
        getGroups: getGroups,
        createGroup: createGroup,
        updateGroup: updateGroup,
        destroyGroup: destroyGroup,
        addProductToGroup: addProductToGroup,
        removeProductFromGroup: removeProductFromGroup,
        searchGroups: searchGroups,
        removeGroupIcon: removeGroupIcon,

        syncProduct: syncProduct,

        getSpotlightProducts: getSpotlightProducts,
        setSpotlightProducts: setSpotlightProducts,

        getSlowMovementProducts: getSlowMovementProducts,
        setSlowMovementProducts: setSlowMovementProducts


      };

      return service;

      function syncProduct(itemCode){
        var url = '/product/sync/' + itemCode;
        return api.$http.post(url);
      }

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

      function search(params){
        var url = '/product/search/';
        return api.$http.post(url, params);
      }

      function advancedSearch(params){
        var url = '/product/advancedsearch';
        return api.$http.post(url, params);
      }

      function update(id, params){
        var url = '/product/update/' + id;
        return api.$http.post(url, params);
      }

      function removeIcon(params){
        var url = '/product/removeicon/';
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

      function getCategoryChildsRelations(handle){
        var url = '/productcategory/childsrelations/' + handle;
        return api.$http.get(url);
      }

      function setCategoryChildsRelations(handle, relations){
        var url = '/productcategory/setchildsrelations/' + handle;
        return api.$http.post(url, {relations: relations});
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

      function getColors(){
        var url = '/productcolor/getall';
        return api.$http.post(url);
      }

      function getBrands(){
        var url = '/productbrand/getall';
        return api.$http.post(url);
      }

      function getCustomBrands(){
        var url = '/custombrand/getall';
        return api.$http.post(url);
      }

      function findCustomBrands(page, params){
        var p = page || 1;
        var url = '/custombrand/find/' + p;
        return api.$http.post(url, params);
      }

      function createCustomBrand(params){
        var url = '/custombrand/create/';
        return api.$http.post(url, params);
      }

      function updateCustomBrand(id, params){
        var url = '/custombrand/update/'+id;
        return api.$http.post(url, params);
      }

      function destroyCustomBrand(id){
        var url = '/custombrand/destroy/'+id;
        return api.$http.post(url);
      }

      function getCustomBrandById(id){
        var url = '/custombrand/findbyid/'+id;
        return api.$http.post(url);
      }

      function createSize(params){
        var url = '/productsize/create/';
        return api.$http.post(url, params);
      }

      function destroySize(id){
        var url = '/productsize/destroy/'+id;
        return api.$http.post(url);
      }

      function updateSize(id, params){
        var url = '/productsize/update/' + id;
        return api.$http.post(url, params);
      }

      function getGroups(page, params){
        var p = page || 1;
        var url = '/productgroup/find/' + p;
        return api.$http.post(url, params);
      }

      function getGroupById(id){
        var url = '/productgroup/findbyid/' + id;
        return api.$http.post(url);
      }

      function createGroup(params){
        var url = '/productgroup/create/';
        return api.$http.post(url, params);
      }

      function destroyGroup(id){
        var url = '/productgroup/destroy/'+id;
        return api.$http.post(url);
      }

      function updateGroup(id, params){
        var url = '/productgroup/update/' + id;
        return api.$http.post(url, params);
      }

      function addProductToGroup(params){
        var url = '/productgroup/addproducttogroup/';
        return api.$http.post(url, params);
      }

      function removeProductFromGroup(params){
        var url = '/productgroup/removeproductfromgroup/';
        return api.$http.post(url, params);
      }

      function searchGroups(params){
        var url = '/productgroup/search/';
        return api.$http.post(url, params);
      }

      function removeGroupIcon(params){
        var url = '/productgroup/removeicon/';
        return api.$http.post(url, params);
      }

      function getProductsbySuppCatNum(id){
        var url = '/product/getproductsbysuppcatnum/' + id;
        return api.$http.post(url);
      }

      function getSpotlightProducts(){
        var url = '/spotlightproducts';
        return api.$http.get(url);        
      }

      function setSpotlightProducts(itemCodes){
        var url = '/spotlightproducts';
        var params = {itemCodes: itemCodes};
        return api.$http.post(url, params);        
      }

      function getSlowMovementProducts(){
        var url = '/slowmovementproducts';
        return api.$http.get(url);        
      }

      function setSlowMovementProducts(itemCodes){
        var url = '/slowmovementproducts';
        var params = {itemCodes: itemCodes};
        return api.$http.post(url, params);        
      }

    }


})();
