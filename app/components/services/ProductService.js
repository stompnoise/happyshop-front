"use strict";

angular.module('happyShopApp.services',[]).service('ProductService', function ($http, $q) {

  var getProducts = function(params){
    var defer = $q.defer();
    $http.get('http://54.87.145.62:3001/products?'+params).then(function (resp) {
      defer.resolve(resp.data);
    }, function (err) {
      defer.reject(err);
    });
    return defer.promise;
  }

  var getProduct = function(id){
    var defer = $q.defer();
    $http.get('http://54.87.145.62:3001/products/'+id).then(function (resp) {
      defer.resolve(resp.data);
    }, function (err) {
      defer.reject(err);
    });
    return defer.promise;
  }

  var paginate = function(page){
    var defer = $q.defer();
    $http.get(page).then(function (resp) {
      defer.resolve(resp.data);
    }, function (err) {
      defer.reject(err);
    });
    return defer.promise;
  }

  return {
    getProducts: getProducts,
    paginate: paginate,
    getProduct: getProduct
  }

});
