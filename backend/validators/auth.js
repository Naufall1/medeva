const yup = require('yup');

const loginSchema = yup.object({
    klinik_id: yup
        .string()
        .min(3, 'Klinik ID must be at least 3 characters')
        .required('Klinik ID is required'),
    username: yup
        .string()
        .trim()
        .min(3, 'User ID must be at least 3 characters')
        .max(20, 'User ID must be at most 20 characters')
        .required('User ID is required'),
    password: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required'),
});

module.exports = {
    loginSchema,
};