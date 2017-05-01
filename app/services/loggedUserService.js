angular.module('ecommerce').service('loggedService', function() {

  var user = {};

  this.getLoggerUser = function() {
    return user;
  }

  this.savedLoggedUser = function(user) {
    user = user;
    console.log('user',user);
  }
})
