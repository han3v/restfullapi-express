const mysql = require('mysql');
const koneksi = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'restfull_api',
     multipleStatements: true
});

koneksi.connect((err) => {
    if (err) throw err;
    console.log('database connected');
});

module.exports = koneksi;