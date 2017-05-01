angular.module('ecommerce').service('cartService', function($http, $q, $state) {

  this.addToCart = function(data) {
    var deferred = $q.defer();
    // console.log(data);
    return $http.post('http://localhost:8777/api/cart', data).then(function(response) {

      // console.log(response);
      if (response.status === 200) {
        $state.go('home', null, { reload: true });
      }
      return response.data;
    },function(error) {
      deferred.reject(error);
    });
  };

  this.getCart = function() {
    // console.log(user);
    var deferred = $q.defer();
    return $http.get('http://localhost:8777/api/cart').then(function(response) {
      // console.log(response);
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


  this.deleteCartProduct = function(product) {
    var deferred = $q.defer();
    // console.log(product);
    return $http.delete('http://localhost:8777/api/cart/id:' + product.id).then(function(response) {
      // var parsedResponse = response.data;
      // console.log(response);
      if (response.status === 200) {
        $state.go($state.$current, null, { reload: true });
      }

      // this.products = parsedResponse;
      // console.log(this.products);
      return response.data;
    },function(error) {
      deferred.reject(error);
    });
  };
})
