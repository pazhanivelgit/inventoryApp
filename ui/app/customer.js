var basePath = '';

inventoryApp.controller('stockList', function ($scope, $http, $location, pwService) {
    //alert('working now');
    
    var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/pw/v1/customers';
    $http.get(url)
    .success(function(data) { 
    
        $scope.stocks = data.entries;
    })
    .error(function (err) { 
        $scope.message = err;
    });
    //$scope.getProjects = function(cust) {
    //    pwService.set(cust);
    //    window.location.href = '#/eprojectlist';
    //}
});

pwbp.controller('ctrl_projectList', function ($scope, $http, $location, pwService) {
    //alert('working now');
    var cust = pwService.get();
    if (cust) {
        var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/pw/v1/customers/' + cust.customer_id + '/projects';
        $http.get(url)
    .success(function (data) {
            $scope.projects = data.entries;
        })
    .error(function (err) {
            $scope.message = err;
        });
        
        $scope.getProjDetails = function (proj) {
            //alert('customer Id is-'+custId.customer_id);
            window.location.href = '#/projectsetup';
        }
    }
    else { 
        window.location.href = '#/ecustomerlist';
    }

});

pwbp.factory('pwService', function() { 

    var _customer;
    function setCustomer(data) { 
        _customer = data;
    }
    function getCustomer() {
       return _customer;
    }

    return {
        set: setCustomer,
        get: getCustomer
    }
});