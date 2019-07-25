const angular = require('angular');
const {registerConstants, registerRoutes, registerControllers, registerFilters} = require('./../utils/utils');

const ngRoute = require('angular-route');
const sportsStoreAdmin = angular.module('sportsStoreAdmin', [ngRoute]);

registerConstants(sportsStoreAdmin, require('./constants.json'));
registerRoutes(sportsStoreAdmin, require("./routing.json"));


