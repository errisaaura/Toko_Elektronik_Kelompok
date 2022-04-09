'use strict'

const db = require('../db')

module.exports = {
    //ini menampilkan semua data
    tampil: (req,res) => {
        const sql = `SELECT * FROM admin`
        db.query(sql, (err, result) => {
            if(err){
                throw err
            }else(
                res.json({
                    message : " Berhasil menampilkan semua data admin",
                    data: result
                })
            )
        })
    },

    //ini untuk menambah data
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
                    message: "Berhasil menambahkan data admin",
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

    //ini untuk mengedit admin berdasarkan id
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
                    message :  "Berhasil mengupdate data admin",
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

    //ini untuk menghapus admin berdasarkan id
    delete: (req,res) => {
        const id_admin = req.params.id_admin
        let sql = `DELETE FROM admin WHERE id_admin = '${id_admin}'`

        db.query(sql, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message :  "Berhasil menghapus data admin"
                })
            }
        })
    }
}