const chalk = require("chalk");
const root = process.argv[2];

if (!root) {
  console.log(chalk.red("root not specified"));
  process.exit(0);
}

const fs = require("fs");
try {
  if (!fs.lstatSync(__dirname + "\\" + root).isDirectory()) {
    console.log(
      chalk.red("root is not a directory: "),
      __dirname + "\\" + root
    );
    process.exit(0);
  }
} catch (error) {
  console.log(chalk.red("root does not exists: "), __dirname + "\\" + root);
}

const params = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root, // './dist', // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  ignore: "scss,pug,vendor", // comma-separated string for paths to ignore
  // file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
  wait: 500, // Waits for all changes, before reloading. Defaults to 0 sec.
  // mount: [['/components', './node_modules']], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [modIndex] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

const paperjs = fs.readFileSync("./node_modules/paper/dist/paper-full.min.js", 'utf8');

function modIndex(req, res, next) {
  switch (req.url) {
    case '/paper.js':
        res.end(paperjs);
      break;
      case '/js/index.js':
          const index = fs.readFileSync("./"+root+'/js/index.js', 'utf8');
          res.end(index.replace("const paper = require('paper');", ""));
        break;
    default:
        next(); 
      break;
  }
  
}

 require( 'live-server' ).start( params );
