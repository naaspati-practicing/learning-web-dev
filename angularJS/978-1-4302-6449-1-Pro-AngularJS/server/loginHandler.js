module.exports = (req, res, next) => {
    if (req.url === '/users/login') {
        if (req.method !== 'POST')
            end(405, "only POST method allowed", res);
        else {
            if (!req.headers['content-type'].includes('application/json'))
                end(400, `'content-type' = 'application/json' is allowed`, res);
            else {
                let data = '';
                req.on('data', d => data += d);
                req.on('end', () => {
                    try {
                        const json = JSON.parse(data);

                        if (json.username == 'admin' && json.password == 'admin')
                            end(202, 'login accepted', res);
                        else
                            end(401, 'login failed: invalid username and/or password', res);
                    } catch (error) {
                        console.log(error);
                        end(400, 'failed to parse json: ' + data, res);
                    }
                });
            }
        }
    } else
        next();
};

function end(statusCode, msg, res) {
    res.statusCode = statusCode;

    if (msg)
        res.end(msg);
    else
        res.end();
}