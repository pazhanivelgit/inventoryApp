var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Products',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    })
    .when('/product/:productId/items', {
      title: 'Product Item',
      templateUrl: 'partials/productItems.html',
      controller: 'productItemsCtrl'
    });
    }]);

app.constant('config', {
    apiUrl: 'http://localhost:8080/v1',
    baseUrl: '/v1'
});

// app.filter('date', function($filter)
// {
//     return function(input)
//     {
//         if(input == null){ return ""; }
//         var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
//         return _date.toUpperCase();
//     };
// });