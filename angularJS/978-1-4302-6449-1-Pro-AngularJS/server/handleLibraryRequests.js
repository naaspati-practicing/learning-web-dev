const cached = {};

const chalk = require('chalk');
const Path = require('path'),
    execution_time = require('execution-time')(),
    browserify = require('browserify'),
    stream = require('stream'),
    serializeError = require('serialize-error'),
    fs = require('fs');;

let params;
let injector;

module.exports = function (injector0) {
    injector = injector0;
    return handler;
}

function handler(req, res, next) {
    const URL = req.url;
    if (!params)
        params = injector('params');

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
    } else if (req.url.startsWith("/node_modules/")) {
        execution_time.start();

        let data = cached[URL];
        if (!data) {
            data = fs.readFileSync("." + URL);
            cached[URL] = data;
        }

        const strm = new stream.PassThrough();
        strm.end(data);
        strm.pipe(res);
        console.log(chalk.yellow('GET '), URL, ' ', execution_time.stop().time.toFixed(3), 'ms ');
    } else {
        console.log(chalk.cyan(URL));
        next();
    }
}