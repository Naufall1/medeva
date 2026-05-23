require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key', // Replace with your own secret key
    DB: {
        NAME: process.env.DB_NAME || 'medeva',
        USER: process.env.DB_USER || 'medeva_user',
        PASSWORD: process.env.DB_PASSWORD || 'medeva_password',
        HOST: process.env.DB_HOST || 'localhost',
        PORT: Number(process.env.DB_PORT || 5432),
        DIALECT: process.env.DB_DIALECT || 'postgres',
    }
}