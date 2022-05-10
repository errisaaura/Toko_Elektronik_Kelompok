'use strict'

const session = require("express-session");
const db = require('../db')

const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const secret = 'kodeAdmin'

function hashPassword (password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

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
    },

    // //endpoint login admin, METHOD: POST, function: findOne
    // login : (async, req,res) => {
    //     let data = {
    //         username: req.body.username,
    //         password: req.body.password
    //     }

    //     // let result  = await admin.findOne({where: data})
    //     let result  = bcrypt.compareSync(password, admin.password)
        
    //     if(!result){
    //         //set payload from data
    //         let payload = JSON.stringify({
    //             id_admin: result.id_admin,
    //             // name: result.name,
    //             username: result.username
    //         })//convert javascript ke json

    //         let token = jwt.sign(payload, secret)
            
    //         res.json({
    //             logged: true,
    //             data: result,
    //             token: token
    //         })
    //     }else{

    //         res.json({
    //             logged: false,
    //             message: "Invalid Username or Password"
    //         })
    //     }
    // }
    login: (req,res) => {
        const username = req.body.username
        const password = req.body.password

        if(!username || !password){
            res.status(402).json({message : 'Email dan Password harus diisi'})
        }else{
            return db.query(`SELECT * FROM admin where username = ?`, username, (err,result) => {
                if(err) return res.status(500).json(err)

                const admin = result[0]
                if(typeof admin === 'undefined') return res.status(401).json({message : "Admin tidak ditemukan", err})

                if(!bcrypt.compareSync(password, admin.password)){
                    if(err) res.status(401).json({message : "Username atau Password tidak sesuai", err})
                }
                const token = jsonwebtoken.sign({data : admin}, secret)
                return res.json({message : 'Login berhasil, silahkan mengisi token dibawah ini untuk mengakses endpoint private lain', token})
            })  

        }
    }

}