const { Users, Klinik, KelasRuangan, KategoriRuangan } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/app-config');
const createHttpError = require('../utils/httpError');
const Sequelize = require('sequelize');

exports.getKategoriRuangan = async (user_id, klinik_id, { page, perPage, search, is_active }) => {
    const { count, rows } = await KategoriRuangan.findAndCountAll({
        where: {
            id_klinik: klinik_id,
            nama_ruangan: { [Sequelize.Op.iLike]: `%${search}%` },
            is_active: is_active !== undefined ? is_active : { [Sequelize.Op.in]: [true, false] },
        },
        include: [
            {
                model: KelasRuangan,
                as: 'kelas_ruangan',
                attributes: ['id', 'nama_kelas'],
            },
        ],
        limit: perPage,
        offset: (page - 1) * perPage,
    });

    if (rows === undefined) {
        throw createHttpError(401, 'Invalid Klinik');
    }

    return {
        kategori_ruangan: rows.map(ruangan => ({
            id: ruangan.id,
            nama: ruangan.nama_ruangan,
            kapasitas: ruangan.fasilitas_ruangan.kapasitas,
            kelas_ruangan: ruangan.kelas_ruangan.nama_kelas,
            jenis_kelamin: ruangan.jenis_kelamin,
            usia: ruangan.usia,
            penyakit: ruangan.penyakit,
            is_active: ruangan.is_active,
        })),
        total: count,
    };
};

exports.getKategoriRuanganByID = async (user_id, klinik_id, kategori_ruangan_id) => {
    const kategori_ruangan = await KategoriRuangan.findOne({
        where: { id: kategori_ruangan_id, id_klinik: klinik_id },
        include: [
            {
                model: KelasRuangan,
                as: 'kelas_ruangan',
                attributes: ['id', 'nama_kelas'],
            },
        ],
    });

    if (!kategori_ruangan) {
        throw createHttpError(404, 'Kategori Ruangan not found');
    }

    return kategori_ruangan;
};

exports.createKategoriRuangan = async (user_id, klinik_id, { nama_ruangan, id_kelas, harga, kapasitas, fasilitas, jenis_kelamin, usia, penyakit, is_active }) => {
    const kelas_ruangan = await KelasRuangan.findOne({
        where: { id: id_kelas, id_klinik: klinik_id },
    });

    if (!kelas_ruangan) {
        throw createHttpError(404, 'Kelas Ruangan not found');
    }

    fasilitas.kapasitas = kapasitas;

    const kategori_ruangan = await KategoriRuangan.create({
        nama_ruangan: nama_ruangan,
        id_kelas_ruangan: id_kelas,
        harga_ruangan: harga,
        fasilitas_ruangan: fasilitas,
        jenis_kelamin: jenis_kelamin,
        usia: usia,
        penyakit: penyakit,
        is_active: is_active,
        id_klinik: klinik_id,
    });

    return kategori_ruangan;
};

exports.updateKategoriRuangan = async (user_id, klinik_id, kategori_ruangan_id, { nama_ruangan, id_kelas, harga, kapasitas, fasilitas, jenis_kelamin, usia, penyakit, is_active }) => {
    const kategori_ruangan = await KategoriRuangan.findOne({
        where: { id: kategori_ruangan_id, id_klinik: klinik_id },
    });

    if (!kategori_ruangan) {
        throw createHttpError(404, 'Kategori Ruangan not found');
    }

    const kelas_ruangan = await KelasRuangan.findOne({
        where: { id: id_kelas, id_klinik: klinik_id },
    });

    if (!kelas_ruangan) {
        throw createHttpError(404, 'Kelas Ruangan not found');
    }

    fasilitas.kapasitas = kapasitas;

    await kategori_ruangan.update({
        nama_ruangan: nama_ruangan,
        id_kelas_ruangan: id_kelas,
        harga_ruangan: harga,
        fasilitas_ruangan: fasilitas,
        jenis_kelamin: jenis_kelamin,
        usia: usia,
        penyakit: penyakit,
        is_active: is_active,
    });

    kategori_ruangan.dataValues.kelas_ruangan = kelas_ruangan; // include kelas_ruangan in the response

    return kategori_ruangan;
};