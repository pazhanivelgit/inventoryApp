app.controller('productItemsCtrl', function ($scope, $modal, $filter,$location, dataService) {
    var prod=dataService.getProduct();
    //var prodId=$route.current.params.productId;
    $scope.product_name=prod.product_name;
    $scope.item = {};
    var prodId=prod.product_id;
    dataService.getItems(prodId).then(function (resp) {
        //var prodList = [];
        $scope.productItems = resp.data;
        
        var total=0;
        for (var i = 0; i < resp.data.length; i++) {  //loop through the array
            total += resp.data[i].qty;  //Do the math!
        }
        
        $scope.stock=total;
    });

    $scope.changeProductStatus = function(product){
        product.status = (product.status=="Active" ? "Inactive" : "Active");
        //Data.put("products/"+product.id,{status:product.status});
    };
    $scope.deleteItem = function(item){
         if (confirm("Are you sure to remove the product")) {
            dataService.deleteItem(item).then(function (result) {
                $scope.items = _.without($scope.items, _.findWhere($scope.items, { item_id: item.item_id}));
            });
        }
    };
    
    $scope.go=function(path)
    {
        $location.path(path);
    }
    
    $scope.open = function(p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productItemsEdit.html',
          controller: 'productItemsEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.items.push(selectedObject);
                $scope.items = $filter('orderBy')($scope.items, 'product_id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.item_id=selectedObject.item_id;
                p.qty=selectedObject.qty;
                p.free=selectedObject.free;
                p.buy_price=selectedObject.buy_price;
                p.sell_price=selectedObject.sell_price;
                p.buy_date=selectedObject.buy_date?new Date(selectedObject.buy_date):new Date();
                p.expiry_date=selectedObject.expiry_date?new Date(selectedObject.expiry_date):new Date();
                p.vendor_name=selectedObject.vendor_name;
                p.description = selectedObject.description;
            }
        });
    };
    
 $scope.columns = [
                    {text:"Item ID",predicate:"item_id",sortable:true,dataType:"number"},
                    {text:"Quantity",predicate:"qty",sortable:true},
                    {text:"Free",predicate:"free",sortable:true},
                    {text:"Buy Price",predicate:"buy_price",sortable:true},
                     {text:"Sell Price",predicate:"sell_price",sortable:true},
                     {text:"Expiry Date",predicate:"expiry",sortable:true},
                     {text:"Buy Date",predicate:"buy",sortable:true},
                     {text:"Vendor",predicate:"vendor",sortable:true},
                     {text:"Total",predicate:"amount",sortable:true},
                     {text:"Action",predicate:"action",sortable:true}
                ];

});

app.controller('productItemsEditCtrl', function($scope, $filter,$modalInstance,$document, item,dataService) {

  $scope.item = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        
        $scope.IsUpdate=(item.item_id > 0) ? true : false;
        $scope.title = (item.item_id > 0) ? 'Edit Item' : 'Add Item';
        $scope.buttonText =(item.item_id > 0) ? 'Update Item' : 'Add New Item';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.item);
        }
        
        //issue in binding date.. that is solu
        if($scope.IsUpdate)
        {
            //$scope.IsItemEnabled=true;
            $scope.item.buy_date = $filter('date')(item.buy_date, "yyyy-MM-dd");
            $scope.item.expiry_date = $filter('date')(item.expiry_date, "yyyy-MM-dd");
        }
        
        $scope.saveItem = function (item) {
            //product.uid = $scope.uid;
            if($scope.IsUpdate){
          dataService.UpdateItem(item).then(function(result) {
                if (result.status === 200) {
                    var x = angular.copy(item);
                    var buy_date=new Date($document.buy_date);
                    x.save = 'update';
                    //x.id = result.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
            }else{
                item.status = 'Active';
            dataService.InsertItem(item).then(function (result) {
                   if(result.status ===200){
                        var x = angular.copy(item);
                        x.save = 'insert';
                        //x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
            });
            }
        };
});


//Refer
//return $http({
//    method: 'GET',
//    url: 'https://www.example.com/api/v1/page',
//    params: 'limit=10, sort_by=created:desc',
//    headers: { 'Authorization': 'Token token=xxxxYYYYZzzz' }
//}).success(function (data) {
//    return data;
//}).error(function () {
//    alert("error");
//    return null;
//});