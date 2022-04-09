'use strict'

const express = require("express")
const productController = require("../controllers/product-controller")
const router = new express.Router()

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const app = require("../controllers/product-controller")

//ini buat image
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./image/product");
    },
    filename: (req,file,cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: storage
})

router.get("/tampil", productController.tampil)
router.get("/tampil/:id_product", productController.tampil_id)
router.post("/tambah", upload.single("image"), productController.tambah)
router.put("/update/:id_product", upload.single("image"), productController.update)
router.delete("/delete/:id_product", productController.delete)

module.exports = router