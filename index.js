const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/database');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create
app.post('/api/admin', (req,res) => {
    const data = {...req.body};
    const querySql = 'INSERT INTO administrator SET?';

    koneksi.query(querySql, data, (err, rows, field) => {
        if(err) {
            return res.status(500).json({
                message: 'gagal insert data',
                error: 'error !'
            });
        }
        
        res.status(201).json({
            success: true,
            message: 'berhasil !'
        });
    });
});

//read
app.get('/api/admin', (req,res) => {
    const querySql = 'SELECT * FROM administrator';

    koneksi.query(querySql, (err, rows, field) => {
        if(err) {
            return res.status(500).json({
                message: 'gagal mengambil data',
                error: 'error!'
            });
        }

        res.status(201).json({
            success: true,
            data: rows
        });
    });
});

//update
app.put('/api/admin/:id', (req,res) => {

    const data = {...req.body};
    const querySearch = 'SELECT * FROM adminstrator WHERE id = ?';
    const queryUpdate = 'UPDATE administrator SET ? WHERE id = ?';

    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
        if(err) {
            return res.status(500).json({
                message: 'ada kesalahan',
                error: 'error!'
            });
        }

        if(rows.length) {
            koneksi.query(queryUpdate[data, req.params.id], (err, rows, field) => {
                if(err) {
                    return res.status(500).json({
                        message: 'ada kesalahan',
                        error: 'error !'
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'data berhasil diupdate'
                });
            });
        } else {
            return response.status(404).json({
                message: 'data tidak ditemukan',
                error: 'error!'
            });
        }
    });
});

//delete
app.delete('/api/admin/:id', (req,res) => {
    const querySearch = 'SELECT * FROM administrator WHERE id = ?';
    const queryDelete = 'DELETE FROM administrator WHERE id = ?';

    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
        if(err) {
            return res.status(500).json({
                message: 'ada kesalahan',
                error: 'error!'
            });
        }

        if(rows.length) {
            koneksi.query(queryDelete[data, req.params.id], (err, rows, field) => {
                if(err) {
                    return res.status(500).json({
                        message: 'ada kesalahan',
                        error: 'error !'
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'data berhasil dihapus'
                });
            });
        } else {
            return response.status(404).json({
                message: 'data tidak ditemukan',
                error: 'error!'
            });
        }
    });
});

app.listen(port, () => {
    console.log('running on port 3000');
});