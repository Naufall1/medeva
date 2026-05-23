const { KelasRuangan } = require('../models');
const createHttpError = require('../utils/httpError');

exports.getKelasRuangan = async (user_id, klinik_id) => {
    const kelas_ruangan = await KelasRuangan.findAll({
        where: { id_klinik: klinik_id },
    });

    if (!kelas_ruangan) {
        throw createHttpError(401, 'Invalid Klinik');
    }

    return {
        kelas_ruangan: kelas_ruangan.map(kelas => ({
            id: kelas.id,
            nama_kelas: kelas.nama_kelas,
        })),
    };
};