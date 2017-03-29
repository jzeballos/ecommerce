angular.module('ecommerce').controller('homeCtrl', function($scope, productsService) {
  // console.log('home controller');
  $scope.getProducts = function() {
      productsService.getProducts().then(function(products) {
        $scope.products = products;
        // console.log('products', products);
      }).catch(handlerError);
    }

  function handlerError(error) {
    console.error(error);
  }

  if (typeof $scope.products == 'undefined') {
    $scope.getProducts();
  }


})
