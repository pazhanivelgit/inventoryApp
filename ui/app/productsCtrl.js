app.controller('productsCtrl', function ($scope, $modal, $filter,$location, dataService) {
    $scope.product = {};
    
    dataService.getProducts().then(function (resp) {
        //var prodList = [];
        $scope.products = resp.data;
    });

    //Data.get('products').then(function(data){
    //    $scope.products = data.data;
    //});

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
    
    $scope.go=function(product,path)
    {
        dataService.setProduct(product);
        $location.path(path);
    }
    
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function() {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'product_id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.stock = selectedObject.stock;
                p.packing = selectedObject.packing;
            }
        });
    };
    
 $scope.columns = [
                    {text:"Product ID",predicate:"product_id",sortable:true,dataType:"number"},
                    {text:"Product Name",predicate:"product_name",sortable:true},
                    {text:"Description",predicate:"Description",sortable:true},
                    {text:"Stocks",predicate:"stocks",sortable:true},
                    {text:"View",predicate:"view",sortable:false},
                    {text:"Action",predicate:"action",sortable:false}
                ];
});


app.controller('productEditCtrl', function ($scope, $modalInstance, item) {

  $scope.product = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.product_id > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.product_id > 0) ? 'Update Product' : 'Add New Product';

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


//app.service('dataService', function($http, $location) {
//    this.getProducts = function () {
//        var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/stocks/v1/products';
//        $http.get(url)
//    .success(function (data) {
//            return data;
//        })
//    .error(function (err) {
//            return err;
//        });
//    }
//});



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