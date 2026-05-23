// Route for get kelas ruangan
const asyncHandler = require('../utils/asyncHandler');
const kelasRuanganService = require('../services/kelasRuanganService');

exports.getKelasRuangan = asyncHandler(async (req, res) => {
    const result = await kelasRuanganService.getKelasRuangan(req.user.id, req.user.klinik.id);

    res.json(result);
});