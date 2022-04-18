'use strict'

const db = require('../db')

module.exports = {
    //ini menampilkan semua data
    tampil: (req,res) => {
        const sql = `SELECT * FROM user`
        db.query(sql, (err, result) => {
            if(err){
                throw err
            }else(
                res.json({
                    message : " Berhasil menampilkan semua data user",
                    data: result
                })
            )
        })
    },

    //ini untuk menambah data
    tambah: (req,res) => {
        let tambah_user = {
            name: req.body.name,
            phone: req.body.phone,
            address : req.body.address,
            email: req.body.email
        }
        let sql = `INSERT INTO user SET ?`

        db.query(sql, tambah_user, (result, err) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "Berhasil menambahkan data user",
                    data: ({
                        name: tambah_user.name,
                        phone: tambah_user.phone,
                        address : tambah_user.address,
                        email: tambah_user.email
                    })
                })
            }
        })
    },

    //ini untuk mengedit user berdasarkan id
    update: (req,res) => {
        const id_user = req.params.id_user
        let tambah_user = {
            name: req.body.name,
            phone: req.body.phone,
            address : req.body.address,
            email: req.body.email
        }
        let sql = `UPDATE user SET ? WHERE id_user = '${id_user}'`

        db.query(sql, edit_user, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message: "Berhasil menambahkan data user",
                    data: ({
                        name: tambah_user.name,
                        phone: tambah_user.phone,
                        address : tambah_user.address,
                        email: tambah_user.email
                    })
                })
            }
        })
    },

    //ini untuk menghapus user berdasarkan id
    delete: (req,res) => {
        const id_user = req.params.id_user
        let sql = `DELETE FROM user WHERE id_user = '${id_user}'`

        db.query(sql, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message :  "Berhasil menghapus data user"
                })
            }
        })
    }
}
