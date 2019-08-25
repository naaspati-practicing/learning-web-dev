const angular = require('angular');
const {registerConstants, registerRoutes, registerControllers, registerFilters} = require('./../utils/utils');

const ngRoute = require('angular-route');
const ngResource = require('angular-resource');
const sportsStoreAdmin = angular.module('sportsStoreAdmin', [ngRoute, ngResource]);

sportsStoreAdmin.config($httpProvider => $httpProvider.defaults.withCredentials = true);

registerConstants(sportsStoreAdmin, require('./constants.json'));
registerRoutes(sportsStoreAdmin, require("./routing.json"));
registerControllers(sportsStoreAdmin, require("./controllers"));