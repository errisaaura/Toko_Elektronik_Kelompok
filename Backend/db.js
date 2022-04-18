const mysql = require("mysql")

//koneksi
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "toko_elektronik_kelompok"
})

module.exports = db