'use strict'

const express = require('express');
const bodyParser = require('body-parser')

//implementasi library
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

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
                harga : req.body.harga,
                stock : req.body.stock,
                description : req.body.description,
                image: req.file.filename
            }
            let sql = `INSERT INTO product SET ?`
            db.query(sql, tambah_product, (err, result) => {
                if(err){
                    throw err
                }else{
                    res.json({
                        messsage: "Berhasil menambahkan data product",
                        data: tambah_product
                    })

                }
               
            })
        }
    },

    //ini untuk mengedit barang berdasarkan id
    update: (req,res) => {
        let id_product = req.params.id_product
        let edit_product = {
            name : req.body.name,
            harga : req.body.harga,
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
    },

    find: (req,res) => {
        let find = req.body.find
        let sql = "select * from product where name like '%" + find + "%' or harga like '%" + find + "%' or description like '%" + find + "%' or stock like '%" + find + "%' or id_product like '%" + find + "%' "

        db.query(sql, (err, result) => {
            if(err){
                throw err
            }else(
                res.json({
                    message : " Berhasil menampilkan data product",
                    data: result
                })
            )
        })
    }



}



