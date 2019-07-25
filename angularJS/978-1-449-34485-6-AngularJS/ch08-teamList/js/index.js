function ListCtrl($scope, filterService) {
    $scope.filterService = filterService;

    const player = (id, name, sport, city, featured) => ({ id, name, sport, city, featured: (featured ? true : false ) });

    $scope.teamList = [
        player(1, "Dallas Mavericks", "Basketball", "Dallas", true),
        player(2, "Dallas Cowboys", "Football", "Dallas", false),
        player(3, "New York Knicks", "Basketball", "New York", false),
        player(4, "Brooklyn Nets", "Basketball", "New York", false),
        player(5, "New York Jets", "Football", "New York", false),
        player(6, "New York Giants", "Football", "New York", true),
        player(7, "Los Angeles Lakers", "Basketball", "Los Angeles", true),
        player(8, "Los Angeles Clippers", "Basketball", "Los Angeles", false),
        player(9, "Dallas Stars", "Hockey", "Dallas", false),
        player(10, "Boston Bruins", "Hockey", "Boston", true)
    ];
}

function FilterCtrl($scope, filterService) {
    $scope.filterService = filterService;
}


const angular = require('angular');
require("./services/filterService.js").default(angular);


const app = angular.module('myApp', ['myApp.services']);

[
    ListCtrl,
    FilterCtrl
].forEach(f => app.controller(f.name, f));
