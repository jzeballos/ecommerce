angular.module('ecommerce').service('productsService', function($http, $q) {

  this.products = [];

  this.getProducts = function() {
    var deferred = $q.defer();
    return $http.get('http://localhost:8777/api/products').then(function(response) {
      var parsedResponse = response.data;
      // console.log(response.data);
      this.products = parsedResponse;
      // console.log(this.products);
      return response.data;
      // deferred.resolve(parsedResponse);
      // return parsedResponse;
    },function(error) {
      deferred.reject(error);
    })
    // return response.data;
    // deferred.promise;
  };

  // this.products = this.getProducts();


  // console.log(this.products);

    // var deferred = $q.defer();
    // $http({
    //   method: 'GET',
    //   url: 'localhost:8777/api/products'
    // })
    // .then(function(response) {
    //   console.log(response);
    //   var parsedResponse = response.data.results;
    //   deferred.resolve(parsedResponse);
    // },function(error) {
    //   deferred.reject(error);
    // })
    // return deferred.promise



})
