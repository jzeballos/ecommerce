angular.module('ecommerce').service('deleteService', function($http, $q,$state) {

  // this.products = [];

  this.deleteProduct = function(product) {
    var deferred = $q.defer();
    return $http.delete('http://localhost:8777/api/products/id:' + product.id).then(function(response) {
      // var parsedResponse = response.data;
      console.log(response);
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
