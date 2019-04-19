let isProduction;
const dir = "." + __dirname.replace(process.cwd(), "").replace(/\\/g, '/') + "/";

let gulp;

module.exports = function ( data ) {
    ( { isProduction, gulp } = data );
    
    return {
        watchDir: [dir + '**/*', dir + '*'],
        task: task,
        name: 'pug'
    };
};

const gulp_util = require( 'gulp-util' ),
    pug = require( 'gulp-pug' ),
    plumber = require( 'gulp-plumber' ),
    open = require( 'gulp-open' ),
    gulpif = require( 'gulp-if' ),
    html_prettify = require( 'gulp-html-prettify' ),
    print = require( 'gulp-print' ).default;

function task() {
    // --file [common file name of .pug and .json/js file (without extension)]
    // if --file is specified 'index is is used by default'
    // --config [full name of the config file] 

    return gulp.src( dir+"index.pug" )
        .pipe( plumber( {
            errorHandler( err ) {
                console.log( err + '' );
                this.emit( 'end' );
            }
        } ) )
        .pipe( pug( {
            basedir: dir,
            data: require('./config/index.js'),
            doctype: 'html'
        } ) )
        .pipe( plumber.stop() )
        .pipe( gulpif( isProduction, html_prettify( {
            indent_char: ' ',
            indent_size: 4
        } ) ) )
        .pipe( gulp.dest( process.env.html_dir ) )
        .pipe( print() )
        .pipe( gulpif( gulp_util.env.hasOwnProperty( 'open' ), open() ) );
}