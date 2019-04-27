const jwt = require( 'jsonwebtoken' );
const SALT = 'my_app_salt',
    USER_NAME = 'admin',
    PASSWORD = 'admin';

const get_paths = ['/api/products', '/products', '/api/categories', '/categories'];
const post_paths = ['/api/orders', '/orders'];

module.exports = function ( req, res, next ) {
    const url = req.url;
    if ( req.method === 'POST' && ( url === '/api/login' || url === '/login' ) ) {
        if ( req.body && req.body.name === USER_NAME && req.body.password === PASSWORD ) {
            const token = jwt.sign( { data: USER_NAME, expiredIn: '1h' } );
            res.json( { success: true, token: token } );
        } else {
            res.json( { success: false } );
        }
        res.end();
        return;
    } else if ( ( startWith( get_paths, url ) && req.method !== 'GET' ) || ( startWith( post_paths, url ) && req.method !== 'POST' ) ) {
        const token = req.headers['authorization'];
        if ( token && token.startsWith( 'Bearer<' ) ) {
            try {
                jwt.verify( token.substring( 7, token.length - 1 ), SALT );
                next();
                return;
            } catch ( error ) {
                console.error( error );
            }
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
};

function startWith( array, url ) {
    for ( const c of array ) {
        if ( url.startsWith( c ) )
            return true;
    }
    return false;
}