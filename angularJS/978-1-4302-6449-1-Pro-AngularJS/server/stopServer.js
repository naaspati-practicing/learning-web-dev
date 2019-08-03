module.exports = (req, res, next) => {
    if (req.url == '/--exit') {
        process.exit(0);
    }

    next();
};