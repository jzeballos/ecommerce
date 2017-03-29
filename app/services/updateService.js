angular.module('ecommerce').service('updateService', function($http, $q) {

  this.products = [];

  this.updateProduct = function(product) {
    var deferred = $q.defer();
    return $http.put('http://localhost:8777/api/products/id=' + product.id, product).then(function(response) {
      // var parsedResponse = response.data;
      console.log(response);
      // this.products = parsedResponse;
      // console.log(this.products);
      return response.data;
    },function(error) {
      deferred.reject(error);
    })
  };
})
