app.service('dataService', function ($http, $location) {
    this.getProducts = function () {
        var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/stocks/v1/products';
       return $http.get(url)
    .success(function (data) {
            return data;
        })
    .error(function (err) {
            return err;
        });
    }
});
