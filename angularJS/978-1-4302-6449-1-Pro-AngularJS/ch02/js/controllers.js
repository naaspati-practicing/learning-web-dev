function sportsStoreCtrl($scope, $http, $location, dataUrl, orderUrl, cart) {
    if (!$scope.data)
        $scope.data = {};

    $http.get(dataUrl)
        .then(data => $scope.data.products = data.data)
        .catch(err => $scope.data.error = err);


    $scope.sendOrder = function (shippingDetails) {
        const order = angular.copy(shippingDetails);
        order.products = cart.getProducts();

        $http.post(orderUrl, order)
            .then(data => {
                cart.clear();
                $scope.data.orderId = data.data.id;
            })
            .catch(err => $scope.data.orderError = err)
            .finally(() => $location.path('/complete'));
    }
}

function productListCtrl($scope, $filter, productListActiveClass, productListPageCount, cart) {
    let selectedCategory = null;

    Object.assign($scope, {
        selectedPage: 1,
        pageSize: productListPageCount,

        selectPage(newPage) {
            $scope.selectedPage = newPage;
        },
        selectCategory(cat) {
            selectedCategory = cat;
            $scope.selectedPage = 1;
        },
        categoryFilterFn(product) {
            return !selectedCategory || product.category === selectedCategory;
        },
        getCategoryClass(cat) {
            return selectedCategory === cat ? productListActiveClass : '';
        },
        getPageClass(page) {
            return page === $scope.selectedCategory ? productListActiveClass : '';
        },
        addProductToCart(product) {
            cart.addProduct(product.id, product.name, product.price);
        }
    });
}

function cartSummaryController($scope, cart) {
    Object.assign($scope, {
        cartData: cart.getProducts(),
        total() {
            return $scope.cartData.reduce((a, b) => a + b.price * b.count, 0);
        },
        remove(item) {
            cart.removeProduct(item.id);
            $scope.cartData = cart.getProducts();
        }
    });
}

module.exports = [
    sportsStoreCtrl,
    productListCtrl,
    cartSummaryController
];