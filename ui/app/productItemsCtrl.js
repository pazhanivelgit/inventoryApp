app.controller('productItemsCtrl', function ($scope, $modal, $filter,$location, dataService) {
    $scope.product = {};
    var prodId=0;
    dataService.getItems(prodId).then(function (resp) {
        //var prodList = [];
        $scope.productItems = resp.data;
    });

    $scope.changeProductStatus = function(product){
        product.status = (product.status=="Active" ? "Inactive" : "Active");
        //Data.put("products/"+product.id,{status:product.status});
    };
    $scope.deleteProduct = function(product){
        if(confirm("Are you sure to remove the product")){
            //Data.delete("products/"+product.id).then(function(result){
            //    $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
            //});
        }
    };
    
    $scope.go=function(path)
    {
        $location.path(path);
    }
    
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
              
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.stock = selectedObject.stock;
                p.packing = selectedObject.packing;
            }
        });
    };
    
 $scope.columns = [
                    {text:"Item ID",predicate:"item_id",sortable:true,dataType:"number"},
                    {text:"Quantity",predicate:"qty",sortable:true},
                    {text:"Buy Price",predicate:"buy_price",sortable:true},
                     {text:"Sell Price",predicate:"sell_price",sortable:true},
                     {text:"Expiry Date",predicate:"expiry",sortable:true},
                     {text:"Vendor",predicate:"vendor",sortable:true},
                     {text:"Total Amount",predicate:"amount",sortable:true}
                ];

});

app.controller('productItemsEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.product = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.id > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.product);
        }
        $scope.saveProduct = function (product) {
            product.uid = $scope.uid;
            if(product.id > 0){
                //Data.put('products/'+product.id, product).then(function (result) {
                //    if(result.status != 'error'){
                //        var x = angular.copy(product);
                //        x.save = 'update';
                //        $modalInstance.close(x);
                //    }else{
                //        console.log(result);
                //  }
                //});
            }else{
                product.status = 'Active';
                //Data.post('products', product).then(function (result) {
                //    if(result.status != 'error'){
                //        var x = angular.copy(product);
                //        x.save = 'insert';
                //        x.id = result.data;
                //        $modalInstance.close(x);
                //    }else{
                //        console.log(result);
                //    }
                //});
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