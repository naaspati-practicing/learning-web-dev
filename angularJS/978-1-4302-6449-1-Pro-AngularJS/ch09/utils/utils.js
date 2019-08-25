module.exports.registerControllers = function (targetModule, controllers) {
    controllers.forEach(f => targetModule.controller(f.name, f));
}
module.exports.registerRoutes = function (targetModule, routing) {
    targetModule.config($routeProvider => {
        for (a in routing) {
            if (a === 'otherwise')
                $routeProvider.otherwise(routing[a]);
            else
                $routeProvider.when(a, routing[a]);
        }
    });    
}

module.exports.registerConstants = function (targetModule, constants) {
    for (const c in constants) {
        targetModule.constant(c, constants[c]);
    }
}
module.exports.registerFilters = function (targetModule, filters) {
    filters.forEach(f => targetModule.filter(f.name, f));
}

module.exports.registerDirectives = function (targetModule, directives) {
    directives.forEach(f => targetModule.directive(f.name, f));
}
module.exports.registerServices = function (targetModule, services) {
    services.forEach(f => targetModule.service(f.name, f));
}