"use strict";

angular.module('happyShopApp.services',[]).service('ProductService', function ($http, $q) {

  var getProducts = function(params){
    var defer = $q.defer();
    $http.get('http://localhost:3000/products?'+params).then(function (resp) {
      defer.resolve(resp.data);
    }, function (err) {
      defer.reject(err);
    });
    return defer.promise;
  }

  var getProduct = function(id){
    var defer = $q.defer();
    $http.get('http://localhost:3000/products/'+id).then(function (resp) {
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
