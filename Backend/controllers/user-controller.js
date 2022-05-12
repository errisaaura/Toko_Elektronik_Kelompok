'use strict'

// const session = require("exspress-session")
const db = require('../db')

const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const secret = 'kodeUser'

function hashPassword (password) {
    const sat = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

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
            email: req.body.email,
            password : req.body.password
        }
        let sql = `INSERT INTO user SET ?`

        db.query(sql, tambah_user, (err, result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "Berhasil menambahkan data user",
                    data: ({
                        name: tambah_user.name,
                        phone: tambah_user.phone,
                        address : tambah_user.address,
                        email: tambah_user.email,
                        password: tambah_user.password
                    })
                })
            }
        })
    },

    //ini untuk mengedit user berdasarkan id
    update: (req,res) => {
        const id_user = req.params.id_user
        let edit_user = {
            name: req.body.name,
            phone: req.body.phone,
            address : req.body.address,
            email: req.body.email,
            password : req.body.password
        }
        let sql = `UPDATE user SET ? WHERE id_user = '${id_user}'`

        db.query(sql, edit_user, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message: "Berhasil mengupdate data user",
                    data: ({
                        name: edit_user.name,
                        phone: edit_user.phone,
                        address : edit_user.address,
                        email: edit_user.email,
                        password : edit_user.password
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
    },

    //ini untuk login
    login: (req,res) => {
        const email = req.body.email
        const password = req.body.password

        if( !email || !password ){
            res.status(402).json({message : 'Email dan Password harus diisi'})
        }else{
            return db.query(`SELECT * FROM user WHERE email = ? `, email, (err,result) => {
                if(err) return res.status(500).json(err)

                const user = result[0]
                if(typeof user === 'undefined') return res.status(401).json({message: "User tidak ditemukan", err})

                if(!bcrypt.compareSync(password, user.password )){
                    if(err) res.status(401).json({message : 'Email atau Password tidak sesuai', err})
                }
                const token = jsonwebtoken.sign({data: user}, secret)
                return res.json({message : 'Login berhasil, silahkan mengisi token dibawah ini untuk mengakses endpoint private lain', token})
            })
        }

    },

    find: (req,res) => {
        let find = req.body.find
        let sql = "select * from user where name like '%" + find + "%' or phone like '%" + find + "%' or address like '%" + find + "%' or email like '%" + find + "%' or id_user like '%" + find + "%' "

        db.query(sql, (err, result) => {
            if(err) throw err
            res.json({
                result
            })
        })
    }
}
