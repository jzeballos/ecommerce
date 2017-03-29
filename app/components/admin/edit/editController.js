angular.module('ecommerce').controller('editCtrl', function($scope, $stateParams, productsService, updateService) {

  var getProduct = function() {
    if (productsService.products.length === 0) {
      productsService.getProducts().then(function(products) {
        for (var i in products) {
          if ($stateParams.id == products[i].id) {
            $scope.product = products[i];
          }
        }
      })
    } else {
      for (var i in productsService.products) {
        if ($stateParams.id == productsService.products[i].id) {
          $scope.product = productsService.products[i];
        }
      }
    }
  }

  getProduct();

//Update product data
  $scope.updateProduct = function () {
    console.log($scope.product);
    updateService.updateProduct($scope.product);
  };
});
