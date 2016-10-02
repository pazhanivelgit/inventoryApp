app.service('dataService', function($http, $location,config) {
    this.getProducts = function() {
        //var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/stocks/v1/products';
        var url = config.apiUrl+'/products';
       return $http.get(url)
    .success(function (data) {
            return data;
        })
    .error(function (err) {
            return err;
        });
    }
    
    this.InsertProduct = function(prod) {
        var url = config.apiUrl + '/products';
        var req = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { product_name: prod.product_name, product_id: prod.product_id, description: prod.description}
        };
        return $http(req)
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
    }
    
    this.UpdateProduct = function (prod) {
        var url = config.apiUrl + '/products/'+ prod.product_id;
        var req = {
            method: 'PUT',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {product_name: prod.product_name, description: prod.description}
        };
        return $http(req)
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
    }

    this.deleteProduct = function (prod) {
        var url = config.apiUrl + '/products/' + prod.product_id;
        var req = {
            method: 'DELETE',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return $http(req)
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
    }
// Items services

   this.getItems = function(prodId) {
        var url = config.apiUrl+'/products/prodId/items';
       return $http.get(url)
    .success(function (data) {
            return data;
        })
    .error(function (err) {
            return err;
        });
    }
    
    this.InsertItem = function(itm) {	
        var url = config.apiUrl + '/products/'+_prod.product_id+'/items';
        var req = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {product_id:_prod.product_id, item_id:itm.item_id,qty:itm.qty,free:itm.free,buy_price:itm.buy_price,sell_price:itm.sell_price,buy_date:itm.buy_date,expiry_date:itm.expiry_date,vendor_name:itm.vendor_name, description:itm.description}
        };
        return $http(req)
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
    }
    
    this.UpdateItem = function (itm) {
        var url = config.apiUrl + '/products/'+_prod.product_id+'/items/'+ itm.item_id;
        var req = {
            method: 'PUT',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {product_id:_prod.product_id, qty:itm.qty,free:itm.free,buy_price:itm.buy_price,sell_price:itm.sell_price,buy_date:itm.buy_date,expiry_date:itm.expiry_date,vendor_name:itm.vendor_name, description:itm.description}
        };
        return $http(req)
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
    }

    this.deleteItem = function (itm) {
        var url = config.apiUrl + '/products/'+_prod.product_id+'/items/' + itm.item_id;
        var req = {
            method: 'DELETE',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return $http(req)
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
    }

//end Item service call
    
    
    
//to pass another page    
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
