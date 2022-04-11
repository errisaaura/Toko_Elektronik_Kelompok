'use strict'

const express = require('express')
const adminController = require('../controllers/user-controller')
const router = new express.Router()

router.get("/tampil", userController.tampil)
router.post("/tambah", userController.tambah)
router.put ("/update/:id_admin", userController.update)
router.delete ("/delete/:id_admin", userController.delete)


module.exports = router
