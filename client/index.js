const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();


// Parse application/json
app.use(bodyParser.json());

// Create databse connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '',
    database: 'karyawan'
});

// Connect to database 
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

// Tampilkan semua data users
app.get('/data/karyawan', (req, res) => {
    let sql = "SELECT * FROM karyawan";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Tampilkan data users berdasarkan  id
app.get('/data/karyawan/:id', (req, res) => {
    let sql = "SELECT * FROM karyawan WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Tambahkan data karyawan baru
app.post('/data/karyawan', (req, res) => {
    let data = { Nama: req.body.Nama, Alamat: req.body.Alamat };
    let sql = "INSERT * INTO karyawan SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Edit data karyawan berdasarkan id
app.put('/data/karyawan/:id', (req, res) => {
    let sql = "UPDATE karyawan SET Nama='" + req.body.Nama + "', Alamat='" + req.body.Alamat + "' WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Delete data karyawan berdasarkan id
app.delete('/data/karyawan/:id', (req, res) => {
    let sql = "DELETE FROM karyawan WHERE id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Server Listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});