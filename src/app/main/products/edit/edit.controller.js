(function ()
{
    'use strict';

    angular
        .module('app.products.edit')
        .controller('ProductEditController', ProductEditController);

    /** @ngInject */
    function ProductEditController($mdDialog, Product,Upload, api){
        var vm = this;
        vm.uploadFiles = uploadFiles;

        // Data
        console.log(Product);
        vm.product = Product.data;
        vm.addMethod = '/product/addfiles';
        console.log(api.baseUrl);

        //Methods
        function uploadFiles($files){
          console.log($files);
          var uid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

          if($files && $files.length > 0){

            for(var i=0;i<$files.length;i++){
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
                  }, function (resp) {
                    console.log(resp);
                  }, function (evt) {
                    console.log(evt);
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
          }
        }

    }
})();
