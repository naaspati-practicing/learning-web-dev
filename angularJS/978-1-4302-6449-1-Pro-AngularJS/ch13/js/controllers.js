const city_country_mapping = {
    "London": "UK",
    "New York": "USA",
    "Paris": "France"
}
Object.freeze(city_country_mapping);

const cities = Object.keys(city_country_mapping);
Object.freeze(cities);

function simpleCtrl($scope) {
    Object.assign($scope, {
        cities,
        city: cities[0],
        getCountry(city) {
            return city_country_mapping[city];
        }
    })
}

function simpleCtrl2($scope) {
    Object.assign($scope, {
        addresses: {},
        setAddress(type, zip) {
            console.log("Type: ", type, " ", zip);
            $scope.addresses[type] = zip;
        },
        copyAddress() {
            $scope.shippingZip = $scope.billingZip;
        }
    });
}

const EVENT_ZIP_CODE_UPDATED = "zipCodeUpdated";

function simpleCtrl3($scope) {
    Object.assign($scope, {
        addresses: {},
        setAddress(type, zip) {
            $scope.$broadcast(EVENT_ZIP_CODE_UPDATED, {type, zip});
            console.log("Type: ", type, " ", zip);
        },
        copyAddress() {
            $scope.shippingZip = $scope.billingZip;
        }
    });

    $scope.$on(EVENT_ZIP_CODE_UPDATED, (event, args) => $scope.addresses[args.type] = args.zip);
}

module.exports = [simpleCtrl, simpleCtrl2, simpleCtrl3];