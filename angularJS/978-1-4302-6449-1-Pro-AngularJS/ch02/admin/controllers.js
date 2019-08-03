function authCtrl($scope, $http, $location, authUrl) {
    $scope.authenticate = function (username, password) {
        $http.post(authUrl,
            { username, password },
            { withCredentials: true }
        )
            .then(res => {
                if (res.status >= 200 && res.status < 300)
                    $location.path('/main');
                else
                    $scope.authenticationError = res;
            })
            .catch(err => $scope.authenticationError = err);
    }
}

function mainCtrl($scope) {
    Object.assign($scope, {
        screens: ["Products", "Orders"],
        current: "Products",
        setScreen(index) {
            $scope.current = $scope.screens[index];
        },
        getScreen() {
            switch ($scope.current) {
                case "Products": return "/admin/views/adminProducts.html";
                case "Orders": return "/admin/views/adminOrders.html";
                default:
                    console.log("unknown value of $scope.current: ", $scope.current);
                    break;
            }
        }
    });
}

function ordersCtrl($scope, $http, ordersUrl) {
    $http.get(ordersUrl, {withCredentials: true} )
    .then(res => res.data)
    .then(json => $scope.orders = json)
    .catch(err => $scope.error = err);

    Object.assign($scope, {
        selectOrder(order) {
            $scope.selectedOrder = order;
        },
        calcTotal(order) {
            return order.products.reduce((total, product) => total + product.count * product.price, 0);
        }
    })
}

// 200
function productCtrl($scope, $resource, productUrl) {
    Object.assign($scope, {
        productsResource: $resource(productUrl+':id', {id: "@id"}),

        listProducts() {
            $scope.products = $scope.productsResource.query();
        },
        deleteProduct(product) {
            product.$delete().then(() => $scope.products.splice($scope.products.indexOf(product), 1));
        },
        createProduct(product) {
            new $scope.productsResource(product).$save()
            .then(newProduct => {
                $scope.products.push(newProduct);
                $scope.editedProduct = null;
            });
        },
        updateProduct(product) {
            product.$save();
            $scope.editedProduct = null;
        },
        startEdit(product) {
            $scope.editedProduct = product;
        },
        cancelEdit() {
            $scope.editedProduct = null;
        }
    });
    $scope.listProducts();
}

module.exports = [authCtrl, mainCtrl, ordersCtrl, productCtrl];