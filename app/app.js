'use strict';

// Defining Angular app model with all other dependent modules
var happyShopApp = angular.module('happyShopApp',['ui.router',
	'happyShopApp.productList', 'happyShopApp.product', 'happyShopApp.services']);

happyShopApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	// Declaration of the default route if neither of the controllers
	// is supporting the request path
	//$routeProvider.otherwise({ redirectTo: '/'});

	// Settings for http communications
	//$httpProvider.defaults.useXDomain = true;
	//delete $httpProvider.defaults.headers.common['X-Requested-With'];

	// disabling # in Angular urls
	// $locationProvider.html5Mode({
	// 		enabled: true,
	//      requireBase: false
	// });



});
