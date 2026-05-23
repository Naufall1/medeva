// auth middleware for express
const config = require('../config/app-config');
const jwt = require('jsonwebtoken');
const JWT_SECRET = config.JWT_SECRET;

const { Users, Klinik } = require('../models');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        try {
            const dbUser = await Users.findOne({
                where: { id: user.sub },
                include: [
                    {
                        model: Klinik,
                        attributes: ['id', 'nama', 'kode_auth'],
                    },
                ],
            });

            req.user = dbUser;
            req.user.klinik = dbUser.klinik;

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error occurred while fetching user data' });
        }
    });
}

module.exports = authenticateToken;