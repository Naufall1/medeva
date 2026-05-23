const { Users, Klinik } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/app-config');
const createHttpError = require('../utils/httpError');

exports.login = async ({ klinik_id, username, password }) => {
    const klinik = await Klinik.findOne({
        where: { kode_auth: klinik_id },
    });

    if (!klinik) {
        throw createHttpError(401, 'Invalid Klinik ID, User ID, or password');
    }

    const user = await Users.findOne({
        where: {
            id_klinik: klinik.id,
            username,
        },
        include: [
            {
                model: Klinik,
                attributes: ['id', 'nama', 'kode_auth'],
            },
        ],
    });

    if (!user) {
        throw createHttpError(401, 'Invalid Klinik ID, User ID, or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        throw createHttpError(401, 'Invalid Klinik ID, User ID, or password');
    }

    const token = jwt.sign(
        {
            sub: user.id,
            klinik_id: user.id_klinik,
            username: user.username,
            is_admin: user.is_admin,
        },
        config.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return {
        token,
        user: {
            username: user.username,
            nama_lengkap: user.nama_lengkap,
            email: user.email,
            is_admin: user.is_admin,
            klinik: user.klinik.nama
        },
    };
}