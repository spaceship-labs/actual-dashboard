(function ()
{
    'use strict';

    angular
        .module('app.configuration.sites_edit')
        .controller('ConfigSitesEditController', ConfigSitesEditController);

    /** @ngInject */
    function ConfigSitesEditController(
      $http,
      api,
      localStorageService,
      dialogService,
      siteService,
      $stateParams,
      Upload
    ){
        var vm = this;
        vm.isLoading = true;

        angular.extend(vm,{
          update:update,
          uploadFiles: uploadFiles,
          removeFiles: removeFiles,
          api: api,
          fileClass: fileClass,
          dir: 'sites/banners'
        });

        function init(){
          vm.isLoading = true;
          siteService.findByHandle($stateParams.handle)
            .then(function(res){
              vm.isLoading = false;
              vm.site = res.data;
              vm.site.Banners = sortSiteBanners(vm.site);
              console.log('vm.site', vm.site);
            })
            .catch(function(err){
              console.log(err);
              vm.isLoading = false;
            });
        }

        function update(form, site){
          if(form.$valid){
            site.isLoading = true;
            site.bannersOrder = getImagesOrder(vm.site.Banners);
            siteService.update(site.handle, site)
              .then(function(res){
                console.log(res);
                site.isLoading = false;
                dialogService.showDialog('Datos actualizados');
              })
              .catch(function(err){
                site.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');
              });
          }
        }

        function getImagesOrder(images){
          var auxImages = [];
          images.forEach(function(image){
            if(auxImages.indexOf(image) < 0){
              auxImages.push(image.id);
            }
          });
          return auxImages;
        }

      function sortSiteBanners(site){
        console.log('sortSiteBanners site', site);
        var idsList = site.bannersOrder ? site.bannersOrder.split(',') : [];
        var unSortedImages = [];
        var orderedList = [];

        if(!site.bannersOrder || site.bannersOrder.length === 0){
          return site.Banners;
        }

        if(idsList.length > 0 && site.bannersOrder){
          var files = angular.copy(site.Banners);
          for(var i=0;i<idsList.length;i++){
            for(var j=0; j<files.length;j++){
              if(files[j].id === idsList[i]){
                orderedList.push(files[j]);
              }
            }
          }
          //Checking if a file was not in the orderedList
          files.forEach(function(file){
            if( !_.findWhere(orderedList, {id: file.id}) ){
              orderedList.push(file);
            }
          });
          orderedList.concat(unSortedImages);
        }

        if(orderedList.length === 0){
          return false;
        }

        return orderedList;
      }

        function uploadFiles($files){
          vm.loading = [];
          vm.isLoadingFiles = true;
          var uid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          var addFilesMethod = '/site/addbanner';

          if($files && $files.length > 0){

            for(var i=0;i<$files.length;i++){

              var dataParams = {
                id: vm.site.id,
                uid:uid,
                index:0,
                file: $files[i]
              };
              var uploadParams = {
                url: api.baseUrl + addFilesMethod,
                data: dataParams
              };
              vm.upload = Upload.upload(uploadParams)
                .then(function (resp) {
                    console.log(resp);
                    var site = resp.data;
                    if(!site || !site.id){
                      return $q.reject();
                    }
                    vm.loading = [];
                    vm.isLoadingFiles = false;
                    vm.site.Banners = site.Banners;
                    vm.site.Banners = sortSiteBanners(vm.site);
                })
                .catch(function (err) {
                    console.log(err);
                    dialogService.showDialog('Hubo un error al subir las imagenes ' + (err || err.data));
                    vm.isLoadingFiles = false;
                })
                .finally(function(){}, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
          }
          else{
            vm.isLoadingFiles = false;
          }
        }

        function removeFiles(){
          var removeMethod = '/site/removefiles';
          var files = [];

          vm.site.Banners.forEach(function(file){
            if(file.selected){
              file.deleting = true;
              files.push(file);
            }
          });

          vm.site.removeFiles = files;
          vm.isLoadingFiles = true;

          var params = {
            method: 'POST',
            url: api.baseUrl + removeMethod,
            data:vm.site
          };

          $http(params).then(function (resp){
              console.log(resp);
              vm.site.Banners = resp.data;
              vm.isLoadingFiles = false;
            })
            .catch(function(err){
              console.log('err', err);
              dialogService.showDialog('Hubo un error al eliminar los archivos ' + (err.data || err) );
              vm.isLoadingFiles = false;
              vm.product.files.forEach(function(file){
                if(file.selected) file.deleting = false;
              });
            });
        }

        function fileClass(file){
          var c = '';
          if(file.selected) c += "selected ";
          if(file.deleting) c += "deleting ";
          if(file == vm.selectedFile) c+= "selected-item ";
          return c;
        }


        init();
    }

})();
