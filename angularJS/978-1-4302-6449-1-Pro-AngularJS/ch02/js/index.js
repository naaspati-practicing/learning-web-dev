const angular = require('angular');
const {registerConstants, registerRoutes, registerControllers, registerFilters} = require('./../utils/utils');

// register filters
const customFilters = angular.module('customFilters', []);
registerFilters(customFilters, require("./filters"));

require('./cart')(angular);

const ngRoute = require('angular-route');
const sportsStore = angular.module('sportsStore', ["customFilters", 'cart', ngRoute]);

registerConstants(sportsStore, require('./constants.json'));
registerRoutes(sportsStore, require("./routing.json"));
registerControllers(sportsStore, require("./controllers");