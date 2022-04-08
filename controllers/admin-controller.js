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
        let sql = `INSERT INTO siswa SET ?`

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

    }
}