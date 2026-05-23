// implement route for login
const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const adminOnly = require('../middlewares/authorization');
const { kategoriRuanganSchema } = require('../validators/kategori-ruangan');
const kategoriRuanganController = require('../controllers/kategoriRuanganController');

router.get('/', kategoriRuanganController.getKategoriRuangan); // TODO: implement pagination and search query (by nama ruangan)
router.get('/:id', kategoriRuanganController.getKategoriRuanganByID);
router.post('/', adminOnly, validate(kategoriRuanganSchema), kategoriRuanganController.createKategoriRuangan);
router.put('/:id', adminOnly, validate(kategoriRuanganSchema), kategoriRuanganController.updateKategoriRuangan);

module.exports = router;