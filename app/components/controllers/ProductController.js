
'use strict';

angular.module('happyShopApp.product', ['ui.router'])

// Routing configuration for this module
.config(function($stateProvider) {

	$stateProvider.state('product', {
		url: '/product/:productId',
		controller: 'ProductController',
		templateUrl: 'components/views/productView.html',
	});
})

// Controller definition for this module
.controller('ProductController', function($scope, $log, ProductService, $stateParams) {
  $log.info($stateParams);
  var productId = $stateParams.productId;

  $scope.product = null;

  ProductService.getProduct(productId).then( function (data) {
    $log.info(data);
    $scope.product = data.data;
  })
});
