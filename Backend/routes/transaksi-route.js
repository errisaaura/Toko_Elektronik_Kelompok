const express = require('express')
const transaksiController = require('../controllers/transaksi-controller')
const router = new express.Router()

const {checkToken} = require('../auth/tokenUser')

router.get("/tampil", transaksiController.tampil)
router.get("tampil/:id_transaksi", transaksiController.tampil_id)
router.post("/tambah", checkToken, transaksiController.tambah)


module.exports = router