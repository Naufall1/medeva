const { ValidationError } = require('yup');

module.exports = (schema, source = 'body') => async (req, res, next) => {
    try {
        const validated = await schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
        });

        req[source] = validated;
        next();
    } catch (error) {
        if (error instanceof ValidationError) {
            error.status = 400;
            error.message = 'Validation failed';
            error.details = error.inner.length > 0
                ? error.inner.map((item) => ({
                    field: item.path,
                    message: item.message,
                }))
                : error.errors.map((message) => ({
                    field: null,
                    message,
                }));
        }

        next(error);
    }
};