let root = process.argv[2];
const chalk = require('chalk');

if (!root || root.trim().length == 0) {
    console.log(chalk.red('server root is not defined'));
    return;
}

root = root.startsWith("./") ? root : "./".concat(root);

const fs = require('fs');

if (!fs.existsSync(root)) {
    console.log(chalk.red('server root not found: '), root);
    return;
}

const  Path = require('path');

const params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: 'localhost', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root, // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    // this is needed, because when json-server updates 'json-server-data.json' live-server reload website, which is unwanted
    ignore: Path.join(root, 'json-server-data.json'), // comma-separated string for paths to ignore
    // file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 500, // Waits for all changes, before reloading. Defaults to 0 sec.
    // mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [
        require('./stopServer'), 
        require('./handleLibraryRequests')(injector)
    ] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

function injector(string) {
    switch (string) {
        case "params":
            return params;
        default:
            break;
    }
}

const liveServer = require('live-server');

liveServer.start(params);

const jsonServerFile = Path.join(root, "json-server-data.json");
if (!fs.existsSync(jsonServerFile)) {
    console.log("\"json-server-data.json\"", chalk.yellow('not found, '), "at: ", jsonServerFile, chalk.red("thus json server is not started"));
    return;
}

// json-server
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(jsonServerFile);
const middleware = jsonServer.defaults();

middleware.push(require('./loginHandler'));

server.use(middleware);
server.use(router);

server.listen(5500, () => console.log(chalk.cyan('json-server running at: '), "http://localhost:5500"));