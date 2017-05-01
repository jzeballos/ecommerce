angular.module('ecommerce').service('usersService', function($http, $q) {

  this.users = [];

  this.getUsers = function() {
    var deferred = $q.defer();
    return $http.get('http://localhost:8777/api/users').then(function(response) {
      var parsedResponse = response.data;
      this.products = parsedResponse;
      return response.data;
    },function(error) {
      deferred.reject(error);
    })
  };
})
