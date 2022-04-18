'use strict'

const express = require('express')
const adminController = require('../controllers/admin-controller')
const router = new express.Router()

router.get("/tampil", adminController.tampil)
router.post("/tambah", adminController.tambah)
router.put ("/update/:id_admin", adminController.update)
router.delete ("/delete/:id_admin", adminController.delete)



module.exports = router