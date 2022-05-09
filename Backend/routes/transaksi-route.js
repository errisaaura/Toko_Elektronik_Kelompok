const express = require('express')
const transaksiController = require('../controllers/transaksi-controller')
const router = new express.Router()

router.get("/tampil", transaksiController.tampil)
router.get("tampil/:id_transaksi", transaksiController.tampil_id)
router.post("/tambah", transaksiController.tambah)


module.exports = router