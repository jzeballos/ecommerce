angular.module('ecommerce').service('homeService', function($http, $q) {



  this.getProducts = function() {
    return $http.get('http://localhost:8777/api/products').then(function(response) {
      var parsedResponse = response.data;
      // console.log(response.data);
      return response.data;
    });




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
  }


})
