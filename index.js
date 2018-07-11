
var express = require('express');
var MongoDB = require('mongodb').MongoClient;
var url = "mongodb://os_solidaritas:apalah@localhost:27017/os_detection" ;
var app = express();
var os = require('os');

MongoDB.connect(url, (err, db) => { 
    console.log("Terhubung ke MongoDB!");

});

app.get('/', (req, res) => {

    MongoDB.connect(url, (err, db) => {
        var dt = {
            namacpu: os.hostname(),
            tipe: os.type(),
            platform: os.platform(),
            rilis: os.release(),
            ramSisa: os.freemem(),
            ramTotal: os.totalmem()
        }
        

        var collection = db.collection('data_os'); 
            collection.insert(dt, (err, result) => {
            console.log("Data sukses tersimpan!");
            res.send(result)
        });
    });
})



app.listen(3210, () => {
    console.log('Server active')
})