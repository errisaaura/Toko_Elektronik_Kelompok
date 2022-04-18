'use strict'

const express = require('express')
const userController = require('../controllers/user-controller')
const router = new express.Router()

router.get("/tampil", userController.tampil)
router.post("/tambah", userController.tambah)
router.put ("/update/:id_user", userController.update)
router.delete ("/delete/:id_user", userController.delete)


module.exports = router
