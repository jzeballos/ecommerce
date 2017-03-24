angular.module('ecommerce', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        // console.log("funciona");
        $stateProvider
          .state('home',{
             url:'/',
             templateUrl: "./app/components/home/homeView.html",
             controller: 'homeCtrl'
         })
        //  .state('products',{
        //      url: '/products',
        //     //  parent:'home',
        //      templateUrl: "app/products.html"
        //  })
        //  .state('contact',{
        //      url:'/contact',
        //      parent:'home',
        //      templateUrl: "../views/contact.html"
        //  })
        //  .state('packages',{
        //      url:'/packages',
        //      templateUrl: "../views/packages.html",
        //      controller: 'packagesCtrl'
        //  })
        //  .state('booked',{
        //      url:'/booked/:id',
        //      templateUrl: "../views/booked.html",
        //      controller: 'bookedCtrl'
        //  })
        //  .state('locations',{
        //      url:'/locations',
        //      templateUrl: "../views/locations.html",
        //      controller: 'locationsCtrl'
        //  });
    });
