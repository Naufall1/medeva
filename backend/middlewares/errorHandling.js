function errorHandler(err, req, res, next) {
    console.error(err)

    const status = err.status || (err.name === 'ValidationError' ? 400 : 500);
    const payload = {
        message: err.message || 'Internal Server Error',
    };

    if (Array.isArray(err.details) && err.details.length > 0) {
        payload.errors = err.details;
    } else if (err.name === 'ValidationError' && Array.isArray(err.errors) && err.errors.length > 0) {
        payload.errors = err.errors;
    }

    res.status(status).json(payload)
}

module.exports = errorHandler;