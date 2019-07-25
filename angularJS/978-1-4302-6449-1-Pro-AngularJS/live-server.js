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

const params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: 'localhost', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root, // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    ignore: 'scss,pug,vendor', // comma-separated string for paths to ignore
    // file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 500, // Waits for all changes, before reloading. Defaults to 0 sec.
    // mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [stopServer, handleLibraryRequests] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

const liveServer = require('live-server'),
    Path = require('path'),
    execution_time = require('execution-time')(),
    browserify = require('browserify'),
    stream = require('stream'),
    serializeError = require('serialize-error');

function stopServer(req, res, next) {
    if (req.url == '/--exit') {
        liveServer.stop();
        process.exit(0);
    }

    next();
}

const cached = {};

function handleLibraryRequests(req, res, next) {
    const URL = req.url;

    if (Path.extname(URL) === '.js') {
            const b = browserify();
            b.add(params.root + URL);
            b.bundle()
            .on('error', err => {
                console.error(err);
                const s = JSON.stringify(serializeError(err));
                res.write(Buffer.from(`alert('failed to browserify: ${URL}\\nsee console log');console.log('browserify error: ');console.log(${s})`, "utf-8"));
                res.end();
            })
            .pipe(res)
            
            console.log(chalk.cyan('GET '), URL, ' -> ', chalk.yellow('browserified'));
    } else if(req.url.startsWith("/node_modules/")) {
        execution_time.start();

        let data = cached[URL];
        if(!data) {
            data = fs.readFileSync("."+URL);
            cached[URL] = data;
        }

        const strm = new stream.PassThrough();
        strm.end( data );
        strm.pipe( res );
        console.log( chalk.yellow( 'GET ' ), URL, ' ', execution_time.stop().time.toFixed( 3 ), 'ms ' );
    } else {
        console.log(chalk.cyan(URL));
        next();
    }
}

liveServer.start(params);

const jsonServerFile = Path.join(root, "json-server-data.json");
if(!fs.existsSync(jsonServerFile)) {
    console.log("\"json-server-data.json\"", chalk.yellow('not found, '),"at: ", jsonServerFile,  chalk.red("thus json server is not started"));
    return;
}

// json-server
const jsonServer = require('json-server');
const server =  jsonServer.create();
const router = jsonServer.router(jsonServerFile);
const middleware = jsonServer.defaults();

server.use(middleware);
server.use(router);

server.listen(5500, () => console.log(chalk.cyan('json-server running at: '), "http://localhost:5500"));