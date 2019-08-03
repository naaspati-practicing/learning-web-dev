const angular = require('angular');
const utils = require('./../utils/utils');

// const ngRoute = require('angular-route');
const app = angular.module('exampleApp', []);

// utils.registerDirectives(app, require('./directives'));
// utils.registerFilters(app, require('./filters'));
// utils.registerServices(app, require('./services'));
utils.registerControllers(app, require("./controllers"));