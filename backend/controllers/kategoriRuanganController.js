// Route for get kategori ruangan
const asyncHandler = require('../utils/asyncHandler');
const kategoriRuanganService = require('../services/kategoriRuanganService');

exports.getKategoriRuangan = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const search = req.query.search || ''; // search by name_ruangan

    // filter by status aktif
    const is_active = req.query.is_active !== undefined ? req.query.is_active === 'true' : undefined;

    const result = await kategoriRuanganService.getKategoriRuangan(req.user.id, req.user.klinik.id, { page, perPage, search, is_active });

    res.json(result);
});

exports.getKategoriRuanganByID = asyncHandler(async (req, res) => {
    const kategori_ruangan_id = req.params.id;
    const result = await kategoriRuanganService.getKategoriRuanganByID(req.user.id, req.user.klinik.id, kategori_ruangan_id);

    res.json(result);
});

exports.createKategoriRuangan = asyncHandler(async (req, res) => {
    const { nama_ruangan, id_kelas, harga, kapasitas, fasilitas, jenis_kelamin, usia, penyakit, is_active } = req.body;
    const result = await kategoriRuanganService.createKategoriRuangan(req.user.id, req.user.klinik.id, { nama_ruangan, id_kelas, harga, kapasitas, fasilitas, jenis_kelamin, usia, penyakit, is_active });

    res.status(201).json(result);
});

exports.updateKategoriRuangan = asyncHandler(async (req, res) => {
    const kategori_ruangan_id = req.params.id;
    const { nama_ruangan, id_kelas, harga, kapasitas, fasilitas, jenis_kelamin, usia, penyakit, is_active } = req.body;

    const result = await kategoriRuanganService.updateKategoriRuangan(req.user.id, req.user.klinik.id, kategori_ruangan_id, { nama_ruangan, id_kelas, harga, kapasitas, fasilitas, jenis_kelamin, usia, penyakit, is_active });

    res.json(result);
});