'use strict'

//import exspress
const express = require('express');
const app = express()
app.use(express.json)

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//database
const db = require("../db");
const { isBuffer } = require('util');

//endpoint
module.exports = {
    //ini untuk menampilkan semua data product 
    tampil: (req,res) => {
        const sql = "SELECT * FROM product"
        db.query(sql, (err, result) => {
            if(err) throw err
            res.json({
                message: "Berhasil menampilkan semua data barang",
                data: result
            })
        })
    },

    //ini untuk menampilkan data barang berdasarkan id
    tampil_id: (req,res) => {
        const id_product = req.params.id_product
        const sql = `SELECT * FROM product WHERE id_product = ${id_product}`

        db.query(sql,(err, result) => {
            if(err) throw err
            res.json({
                message : "Berhasil menampilkan 1 data product",
                data: result
            })
        })
    },

    //ini untuk menambahkan data barang
    tambah: (req,res) => {
        if(!req.file){
            res.json({
                message: "No uploaded file",
            })
        }else{
            let tambah_product = {
                name: req.body.name,
                price : req.body.price,
                stock : req.body.stock,
                description : req.body.description,
                image: req.file.filename
            }
            const sql = `INSERT INTO product SET ?`
            db.query(sql, tambah_product, (err, result) => {
                if((null, err)) throw err
                
                res.json({
                    messsage: "Berhasil menambahkan data product",
                    data: tambah_product
                })
            })
        }
    },

    //ini untuk mengedit barang berdasarkan id
    update: (req,res) => {
        let id_product = req.params.id_product
        let edit_product = {
            name : req.body.name,
            price : req.body.price,
            stock : req.body.stock,
            description : req.body.description   
        }
        if(req.file){
            edit_product.image = req.file.filename
            let sql = `UPDATE product SET ? WHERE id_product = ${id_product}`
            db.query(sql, edit_product, (err, result) => {
                if(err) throw err
                res.json({
                    message: "Berhasil mengupdate data product"
                })
            })
        }else{
            let sql = `UPDATE product SET ? WHERE id_product = ${id_product}`
            db.query(sql, edit_product, (err, result) => {
                if(err) throw err
                res.json({
                    message: "Data product sudah terupdate",
                    data: result
                })
            })
        }
    },

    //ini untuk menghapus product berdasarkan id
    delete: (req,res) => {
        const id_product = req.params.id_product
        let sql = `DELETE FROM product WHERE id_product = ${id_product}`
        db.query(sql, (err, result) => {
            if((null, err)) throw err
            res.json({
                message: "Berhasil menghapus data product",
                data: result
            })
        })
    }



}



