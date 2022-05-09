'use strict'

const express = require('express');
const bodyParser = require('body-parser')

//implementasi library
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const moment = require('moment')

//database
const db = require("../db");

//endpoint 
module.exports = {
    //ini untuk menambahkan data
    tambah : (req,res) => {
        var now = new Date();
        var date = moment(now).format('DD-MM-YYYY');
        let tambah_transaksi = {
            id_user : req.body.id_user,
            id_product : req.body.id_product,
            qty : req.body.qty,
            tanggal : date
        }

        let sql = `INSERT INTO transaksi set ?`
        db.query(sql, tambah_transaksi, (err, result) => {
            if(err){
                throw err
            }else{
                res.json({
                    messsage: "Berhasil menambahkan data transaksi",
                    data: tambah_transaksi
                })

            }
        })
    },

    //ini untuk menampilkan semuanya
    tampil: (req,res) => {
        let sql = `SELECT * FROM transaksi JOIN user ON transaksi.id_user = user.id_user JOIN product ON transaksi.id_product = product.id_product`
        db.query(sql, (err, result) => {
            if(err) throw err
            var transaksi = results[0].tanggal
            var dateformat = moment(transaksi).format('YYYY-MM-DD');
            res.json({
                message: "Berhasil menampilkan semua data transaksi",
                data: result,
                date : dateformat
            })
        })
    },

    //ini untuk menampilkan berdasarkan id
    tampil_id : (req,res) => {
        const id_transaksi = req.params.id_transaksi

        let sql = `SELECT * FROM transaksi JOIN user ON transaksi.id_user = user.id_user JOIN product ON transaksi.id_product = product.id_product WHERE transaksi.id_transaksi = ${id_transaksi}`
        db.query(sql, (err,result) => {
            if(err) throw err
            var transaksi = results[0].tanggal_transaksi
            var dateformat = moment(transaksi).format('YYYY-MM-DD');

            res.json({
                message: "Berhasil menampilkan data sesuai id transaksi",
                data : result,
                date: dateformat
            })


        })
    }


}