angular.module('ecommerce').service('createService', function($http, $q, $state) {

  this.createProduct = function(product) {
    var deferred = $q.defer();
    return $http.post('http://localhost:8777/api/products', product).then(function(response) {
      console.log(response);
      if (response.status === 200) {
        $state.go('admin', null, { reload: true });
      }
      return response.data;
    },function(error) {
      deferred.reject(error);
    });
  };
})
