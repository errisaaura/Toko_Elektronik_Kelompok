'use strict'

const db = require('../db')

module.exports = {
    tampil: (req,res) => {
        const sql = `SELECT * FROM admin`
        db.query(sql, (err, result) => {
            if(err){
                throw err
            }else(
                res.json({
                    message : "Menampilkan semua data admin",
                    data: result
                })
            )
        })
    },

    tambah: (req,res) => {
        let tambah_admin = {
            name: req.body.name,
            phone: req.body.phone,
            address : req.body.address,
            username: req.body.username,
            password : req.body.password
        }
        let sql = `INSERT INTO admin SET ?`

        db.query(sql, tambah_admin, (err, result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "Data admin berhasil ditambahkan",
                    data: ({
                        name: tambah_admin.name,
                        phone: tambah_admin.phone,
                        address : tambah_admin.address,
                        username: tambah_admin.username,
                        password : tambah_admin.password
                    })
                })
            }
        })
    },
    update: (req,res) => {
        const id_admin = req.params.id_admin
        let edit_admin = {
            name : req.body.name,
            phone : req.body.phone,
            address : req.body.address,
            username : req.body.username,
            password : req.body.password
        }
        let sql = `UPDATE admin SET ? WHERE id_admin = '${id_admin}'`

        db.query(sql, edit_admin, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message : "Data admin berhasil di update",
                    data : ({
                        id : id_admin,
                        name : edit_admin.name,
                        phone : edit_admin.phone,
                        address : edit_admin.address,
                        username : edit_admin.username,
                        password : edit_admin.password
                    })
                })
            }
        })
    },

    delete: (req,res) => {
        const id_admin = req.params.id_admin
        let sql = `DELETE FROM admin WHERE id_admin = '${id_admin}'`

        db.query(sql, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message : "Data admin berhasil di hapus"
                })
            }
        })
    }
}