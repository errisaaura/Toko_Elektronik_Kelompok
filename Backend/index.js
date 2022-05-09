'use strict'

//inisialisasi
const express = require('express');
const bodyParser = require('body-parser')

//implementasi
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//menghubungkan ke database
const db = require ('./db')
db.connect(error => {
    if(error){
        console.log(error.message)
    }else{
        console.log("Mysql Connected")
    }
})

app.get("/", (req,res) => {
    res.send({
        message: "Berhasil menjalankan GET",
        data : {
            description : 
            "Endpoint ini menampilkan data"
        }
    })
})

app.use("/admin", require('./routes/admin-route'))
app.use("/product", require('./routes/product-route'))
app.use("/user", require('./routes/user-route'))
app.use("/transaksi", require("./routes/transaksi-route"))
//ini untuk servernya
const port = 3000
app.listen(port, () => {
    console.log(`App running in server ${port}`)
})
