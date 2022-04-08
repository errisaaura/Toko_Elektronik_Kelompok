'use strict'

const express = require('express')
const adminController = require('../controllers/admin-controller')
const router = new express.Router()

router.get("/", adminController.tampil)


module.exports = router