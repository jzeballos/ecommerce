angular.module('ecommerce').controller('createCtrl', function($scope, createService) {

//Create product
  $scope.createProduct = function () {

    createService.createProduct($scope.product);
  };

});
