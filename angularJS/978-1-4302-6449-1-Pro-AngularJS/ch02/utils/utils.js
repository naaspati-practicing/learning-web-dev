module.exports.registerControllers = function (module, controllers) {
    controllers.forEach(f => module.controller(f.name, f));
}
module.exports.registerRoutes = function (module, routing) {
    module.config($routeProvider => {
        for (a in routing) {
            if (a === 'otherwise')
                $routeProvider.otherwise(routing[a]);
            else
                $routeProvider.when(a, routing[a]);
        }
    });    
}

module.exports.registerConstants = function (module, constants) {
    for (const c in constants) {
        module.constant(c, constants[c]);
    }
}
module.exports.registerFilters = function (module, filters) {
    filters.forEach(f => module.filter(f.name.replace(/Filter$/, ''), f));
}