(function ()
{
    'use strict';

    angular
        .module('app.products.categories.edit-relations')
        .controller('EditRelationsController', EditRelationsController);

	function EditRelationsController($stateParams, $scope, productService, dialogService ) {
	  var vm = this;
	  vm.init = init;
	  vm.update = update;

	  function init(){
	  	vm.isLoading = true;
	  	vm.categoryName = $stateParams.handle;
	    productService.getCategoryChildsRelations($stateParams.handle).then(function(res){
	      console.log('res', res);
	      vm.relations = (res.data || []).filter(function(relation){
	      	return relation.child;
	      });
	      vm.isLoading = false;
	    });
	  }

	  function update(){
	  	if(!vm.relations || vm.relations.length === 0){
	  		return;
	  	}
	  	vm.isLoading = true;
	  	productService.setCategoryChildsRelations($stateParams.handle, vm.relations)
	  		.then(function(res){
	  			console.log('res', res);
	  			vm.isLoading = false;
	  			dialogService.showDialog('Posiciones actualizadas');
	  		})
	  		.catch(function(err){
	  			console.log('err', err);
	  			vm.isLoading = false;
	  		})

	  }

	  init();
	}

})();
