// routes for kelas ruangan
const express = require('express');
const router = express.Router();
const kelasRuanganController = require('../controllers/kelasRuanganController');

router.get('/', kelasRuanganController.getKelasRuangan);

module.exports = router;