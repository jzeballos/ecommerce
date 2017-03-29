angular.module('ecommerce').controller('adminCtrl', function($scope, $stateParams, productsService, deleteService) {
  // console.log(productsService.products);

  if (productsService.products.length === 0) {
    productsService.getProducts().then(function(products) {
      // for (var i in products) {
        // console.log($stateParams.id);
        // if ($stateParams.id == products[i].id) {
          $scope.products = products;
          // console.log($scope.product);
        // }
      // }
    })
  } else {
    // for (var i in productsService.products) {
      // console.log($stateParams.id);
      // if ($stateParams.id == productsService.products[i].id) {
        $scope.products = productsService.products;
        // console.log($scope.product);
      // }
    // }
  }

//Delete Product
  $scope.deleteProduct = function(product) {
    deleteService.deleteProduct(product);
    // $route.reload()
  }


});
