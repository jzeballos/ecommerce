angular.module('ecommerce', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        // console.log("funciona");
        $stateProvider
          .state('home',{
             url:'/',
             templateUrl: "./app/components/home/homeView.html",
             controller: 'homeCtrl'
         })
          .state('product',{
             url:'/product/:id',
             templateUrl: "./app/components/product/productView.html",
             controller: 'productCtrl'
         })
         .state('admin',{
             url: '/admin',
             templateUrl: "./app/components/admin/home/adminView.html",
             controller: 'adminCtrl'

         })
         .state('edit',{
             url:'admin/edit/:id',
             templateUrl: "./app/components/admin/edit/editView.html",
             controller: 'editCtrl'
         })
         .state('create',{
             url:'admin/create',
             templateUrl: "./app/components/admin/create/createView.html",
             controller: 'createCtrl'
         })
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
