angular.module('ecommerce').controller('cartCtrl', function($scope, $stateParams, $state, $cookies, $http, productsService, usersService, cartService) {

  $scope.getCart = function() {
      cartService.getCart().then(function(products) {
        $scope.cart = products;
      }).catch(handlerError);
    }
  function handlerError(error) {
    console.error(error);
  }

  $scope.quantity = [];
  if (typeof $scope.cart == 'undefined') {
    $scope.getCart();
  }

  //Delete Product from cart
  $scope.deleteCartProduct = function(product) {
    cartService.deleteCartProduct(product);
    }

  //Calculate total
  $scope.getTotal = function(){
    var total = 0;
    for(var i in $scope.cart){
        total += ($scope.cart[i].price * $scope.cart[i].quantity);
    }
    return total;
  }









  // console.log("home logged", $scope.logged);
  if ($cookies.get("loggedInUser")) {
    // $scop.user = $cookies.get("loggedInUser");
    // console.log('exists');
    $scope.user = JSON.parse($cookies.get("loggedInUser"));

    console.log($scope.user);
    // $scope.logged = true;
    // console.log($scope.user.id*1);

    if (usersService.users.length === 0) {
      usersService.getUsers().then(function(users) {
        for (var i in users) {
          // console.log(users[i]);
          if ($scope.user.id == users[i].id*1) {
            if (users[i].admin === true) {
              // console.log(users[i].admin);
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
      // , product, quantity
      var data = {
        user: user,
        product: product,
        quantity: quantity
      };
      // console.log(data);
      cartService.addToCart(data);
    } else {
      $state.go('login');
    }
  }

  if (typeof $scope.products == 'undefined') {
    $scope.getProducts();
  }

})
