angular.module('ecommerce').controller('homeCtrl', function($scope, $stateParams, $state, $cookies, $http, productsService, usersService, cartService) {
  if ($cookies.get("loggedInUser")) {
    $scope.user = JSON.parse($cookies.get("loggedInUser"));
    $scope.logged = true;

    if (usersService.users.length === 0) {
      usersService.getUsers().then(function(users) {
        for (var i in users) {
          if ($scope.user.id == users[i].id*1) {
            if (users[i].admin === true) {
              $scope.user.admin = true;
            }
          }
        }
      })
    }
  } else {
    $scope.logged = false;
  };

  $scope.getProducts = function() {
      productsService.getProducts().then(function(products) {
        $scope.products = products;
      }).catch(handlerError);
    }
  function handlerError(error) {
    console.error(error);
  }

  $scope.quantity = [];
  $scope.addToCart = function(index) {
    if ($scope.logged ) {

      var user = $scope.user.id*1;
      var product = $scope.products[index].id*1;
      var quantity = $scope.quantity[index]*1;
      var data = {
        user: user,
        product: product,
        quantity: quantity
      };
      cartService.addToCart(data);
    } else {
      $state.go('login');
    }
  }


  if (typeof $scope.products == 'undefined') {
    $scope.getProducts();
  }

})
