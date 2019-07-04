const angular = require('angular');

function HelloController($scope) {
    $scope.greeting = { text: 'Hello' };
}

function CartController($scope) {
    const obj = {
        items: [
            { title: 'Paint pots', quantity: 8, price: 3.95 },
            { title: 'Polka dots', quantity: 17, price: 12.95 },
            { title: 'Pebbles', quantity: 5, price: 6.95 }
        ],
        remove(index) {
            $scope.items.splice(index, 1);
        },
    };

    Object.assign($scope, obj);
}

const main = angular.module('main', []);

[
    HelloController,
    CartController
]
    .forEach(f => main.controller(f.name, f));
