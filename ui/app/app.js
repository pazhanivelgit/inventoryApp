var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Products',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    })
    .when('/productItems', {
      title: 'Product Item',
      templateUrl: 'partials/productItems.html',
      controller: 'productItemsCtrl'
    });
}]);