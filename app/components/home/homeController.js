angular.module('ecommerce').controller('homeCtrl', function($scope, homeService) {
  console.log('home controller');
  $scope.getProducts = function() {
    homeService.getProducts().then(function(products) {
      $scope.products = products;
      console.log('products', products);
    }).catch(handlerError);
  }
  function handlerError(error) {
    console.error(error);
  }

  $scope.getProducts();

})
