const angular = require('angular');

function HelloController($scope) {
    $scope.greeting = { text: 'Hello' };
}

function CartController($scope) {
    const obj = {
        bill: {},
        pageHeading: 'my name is sameer',

        items: [
            { title: 'Paint pots', quantity: 8, price: 3.95 },
            { title: 'Polka dots', quantity: 17, price: 12.95 },
            { title: 'Pebbles', quantity: 5, price: 6.95 }
        ],
        remove(index) {
            $scope.items.splice(index, 1);
        },
        totalCart() {
            return $scope.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        subtotal() {
            return $scope.totalCart() - $scope.bill.discount;
        }
    };

    function calculateDiscount(newValue) {
        $scope.bill.discount = newValue > 100 ? 10 : 0;
    }

    Object.assign($scope, obj);
    $scope.$watch($scope.totalCart, calculateDiscount);
}

// -------------------------------------------------
// filters

function titleCaseFilter(/** @type {string} */ input) {
    if (!input)
        return input;

    return input.split(' ')
    .map(s => !s ? s : (s.charAt(0).toUpperCase() + s.substring(1)))
    .join(' ');
}

const main = angular.module('main', []);

[
    HelloController,
    CartController
]
    .forEach(f => main.controller(f.name, f));


[
    titleCaseFilter
]
.forEach(f => main.filter(f.name.replace(/Filter$/, ''), () => f));
