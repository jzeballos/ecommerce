angular.module('ecommerce').controller('productCtrl', function($scope, $stateParams, productsService) {
  // console.log(productsService.products);

  if (productsService.products.length === 0) {
    productsService.getProducts().then(function(products) {
      for (var i in products) {
        // console.log($stateParams.id);
        if ($stateParams.id == products[i].id) {
          $scope.product = products[i];
          // console.log($scope.product);
        }
      }
    })
  } else {
    for (var i in productsService.products) {
      // console.log($stateParams.id);
      if ($stateParams.id == productsService.products[i].id) {
        $scope.product = productsService.products[i];
        // console.log($scope.product);
      }
    }
  }

});
