class Item {
    constructor(id, price, name, count) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.count = count;
    }
}

class Cart {
    constructor() {
        this.cartData = new Map();
        this.cartDataArray = [];
    }
    addProduct(id, name, price) {
        const item = this.cartData.get(id);

        if (item)
            item.count++;
        else {
            const t = new Item(id, price, name, 1);
            this.cartData.set(id, t);
            this.cartDataArray.push(t);
        }
    }
    clear() {
        this.cartData.clear();
        this.cartDataArray.length = 0;
    }
    removeProduct(id) {
        this.cartData.delete(id);

        for (let n = 0; n < this.cartDataArray.length; n++) {
            const e = this.cartDataArray[n];
            if(e.id === id) {
                this.cartDataArray.splice(n, 1);
                break;
            }
        }
    }
    getProducts() {
        return this.cartDataArray;
    }
    getProductsAsMap() {
        return this.cartData;
    }
}

function cartSummaryFactory(cart) {
    return {
        restrict: 'E',
        templateUrl:  'components/cart/cartSummary.html',
        controller($scope) {
            function reduce(callback) {
                let a = 0;
                cart.getProducts()
                .forEach(product => a += callback(product));
                return a;
            }
            
            Object.assign($scope,  {
                total() {
                    return reduce(b => b.price * b.count);
                },
                itemCount() {
                    return reduce(b => b.count);
                }
            });
        }
    }
}

module.exports = function(
    /** @type {angular} */
    angular
    ) {

    angular.module('cart', [])
    .factory('cart', () => new Cart())
    .directive('cartSummary', cartSummaryFactory);
}