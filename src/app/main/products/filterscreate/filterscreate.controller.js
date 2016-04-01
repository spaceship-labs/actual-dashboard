(function ()
{
    'use strict';

    angular
        .module('app.products.filters.create')
        .controller('ProductFiltersCreateController', ProductFiltersCreateController);

    /** @ngInject */
    function ProductFiltersCreateController($mdDialog, $stateParams, productService,Upload, api, $http){
        var vm = this;
        vm.uploadFiles = uploadFiles;
        vm.removeFiles = removeFiles;
        vm.fileClass = fileClass;
        vm.updateIcon = updateIcon;
        vm.init = init;

        // Data
        vm.loading = [];
        //vm.product = Product.data;
        vm.updateIconMethod = '/product/updateicon';
        vm.addMethod = '/product/addfiles';
        vm.removeMethod = '/product/removefiles';
        vm.dir = 'products/gallery';
        vm.api = api;

        /*vm.wyswygOptions = [
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
          ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
          ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];
        */
        vm.wyswygOptions = [
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'quote',
          'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol','insertLink', 'insertVideo']
        ];

        vm.ensembles = [
          {value:'Se entrega totalmente ensamblado', label:'Se entrega totalmente ensamblado'},
          {value:'Requiere poco ensamble', label:'Requiere poco ensamble'},
          {value:'Requiere mucho ensamble', label:'Requiere mucho ensamble'},
        ];

        vm.init();

        //Methods

        function init(){
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
          });
        }



        function updateIcon($file) {
          console.log($file);
          vm.loadingAvatar = true;
          vm.uploadAvatar = Upload.upload({
            url: api.baseUrl + vm.updateIconMethod,
            data: {
              id: vm.product.ItemCode,
              file: $file
            }
          }).then(function (resp) {
              console.log(resp);
              if(resp.data.icon_filename){
                vm.product.icon_filename = resp.data.icon_filename;
                vm.product.icon_name = resp.data.icon_name;
                vm.product.icon_size = resp.data.icon_size;
                vm.product.icon_type = resp.data.icon_type;
                vm.product.icon_typebase = resp.data.icon_typebase;
              }
              vm.loadingAvatar = false;
            }, function (err) {
              console.log(err);
              vm.loadingAvatar = false;
            }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };

        function uploadFiles($files){
          //console.log($files);
          vm.loading = [];
          var uid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

          if($files && $files.length > 0){

            for(var i=0;i<$files.length;i++){
              vm.loading.push($files[i]);

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
                    vm.loading = [];
                    vm.product.files = resp.data.files;
                  }, function (err) {
                    console.log(err);
                  }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
          }
        }

        function fileClass(file){
          var c = '';
          if(file.selected) c += "selected ";
          if(file.deleting) c += "deleting ";
          return c;
        }

        function removeFiles(){

          var files = [];
          vm.product.files.forEach(function(file){
            if(file.selected){
              file.deleting = true;
              files.push(file);
            }
          });

          vm.product.removeFiles = files;

          $http({method: 'POST', url: api.baseUrl + vm.removeMethod,data:vm.product}).then(
            function (object){
              console.log(object);
              vm.product.files = object.data.files;
            },
            function(err){
              vm.product.files.forEach(function(file){
                if(file.selected) file.deleting = false;
              });
            }
          );

        }

    }
})();