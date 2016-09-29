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
    
    this.getItems = function(prodId) {
        var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/stocks/v1/products/'+prodId;
       return $http.get(url)
    .success(function (data) {
            return data;
        })
    .error(function (err) {
            return err;
        });
    }
    
    var _prod;
    this.setProduct=function(product)
    {
        _prod=product;
    }
    
    this.getProduct=function()
    {
        return _prod;
    }
});
