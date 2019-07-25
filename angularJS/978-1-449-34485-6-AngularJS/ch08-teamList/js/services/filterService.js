module.exports.default = function(angular) {
    return angular.module('myApp.services', [])
    .factory('filterService', function() {
        return {
            activeFilters: {},
            searchText: ''
        }
    }); 
}