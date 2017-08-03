
'use strict';

angular.module('happyShopApp.productList', ['ui.router'])

// Routing configuration for this module
.config(function($stateProvider) {

	$stateProvider.state('products', {
		url: '/',
		controller: 'ProductListController',
		templateUrl: 'components/views/productListView.html',
	});
})

// Controller definition for this module
.controller('ProductListController', function($scope, $log, ProductService) {

	$scope.products = [];

	var defaultPage = 'page[number]=1&page[size]=6';
	var firstPage = null;
	var prevPage = null;
	var nextPage = null;
	var lastPage = null;

	ProductService.getProducts(defaultPage).then( function (data) {
		$log.info(data);
		$scope.products = data.data;
		firstPage = data.links.first;
		prevPage = data.links.prev;
		nextPage = data.links.next;
		lastPage = data.links.last;
	});

	$scope.selectedCategory = "all";
	$scope.selectedPriceRange = "all";
	$scope.selectedSort = "low to high"

	$scope.selectCategory = function(){
		$log.info($scope.selectedCategory);
	}

	$scope.reloadList = function(){
		var params = defaultPage;
		if ($scope.selectedCategory!='all') {
			params = params+'&filter[category]='+$scope.selectedCategory;
		}

		if($scope.selectedPriceRange!='all') {
			var min = 0;
			var max = 0;
			switch ($scope.selectedPriceRange) {
				case '0-50':
					max = 50;
					break;
				case '51-100':
				  min = 51;
					max = 100;
					break;
				case '101-200':
				  min = 101;
					max = 200;
					break;
				case '201-300':
				  min = 201;
					max = 300;
					break;
				default:
			}
			if(params.length>0){
				params = params+"&"
			}
			params = params+"filter[price_min]="+min+"&filter[price_max]="+max;
		}

		if(params.length>0){
			params = params+"&"
		}
		if($scope.selectedSort=='low to high'){
			params = params+"sort=price"
		}
		else{
			params = params+"sort=-price"
		}

		$log.info(params);
		ProductService.getProducts(params).then( function (data) {
			$log.info(data.links);
			$scope.products = data.data;
			firstPage = data.links.first;
			prevPage = data.links.prev;
			nextPage = data.links.next;
			lastPage = data.links.last;
		});
	}

	$scope.goFirst = function() {
		if(firstPage){
			paginate(firstPage);
		}
	}

	$scope.goPrev = function() {
		if(prevPage){
			paginate(prevPage);
		}
	}

	$scope.goNext = function() {
		if(nextPage){
			paginate(nextPage);
		}
	}

	$scope.goLast = function() {
		if(lastPage){
			paginate(lastPage);
		}
	}

	var paginate = function(page) {
		ProductService.paginate(page).then( function (data) {
			$scope.products = data.data;
			firstPage = data.links.first;
			prevPage = data.links.prev;
			nextPage = data.links.next;
			lastPage = data.links.last;
		});
	}

});
