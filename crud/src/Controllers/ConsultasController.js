var express = require('express')
var router = express.Router()
var { client, getCollections } = require('./../mongo')
var ObjectId = require('mongodb').ObjectID

router.get('/list', (req, res) => {

    client.connect(err => {
        collection = client.db("crud").collection("consultas");
        collection.find().toArray((err, results) => {
            if (err) return console.log(err)
            res.json(results)
        })
    })
})

// ADD CONSULTA
router.post('/add', (req, res) => {
    client.connect(err => {
        collection = client.db("crud").collection("consultas");
        collection.insertOne(req.body, function (err, res) {
            if (err) throw err;
            console.log("consulta was added");
        });
    });
})
// END - ADD CONSULTA

// EDIT CONSULTA
router.post('/edit/', (req, res) => {

    var data = req.body;
    var id = data.id
    delete data.id;

    client.connect(err => {
        collection = client.db("crud").collection("consultas");
        collection.updateOne({ _id: ObjectId(id) }, { $set: data },
            ((err, results) => {
                if (err) return console.log(err)
                console.log('CONSULTA was updated')
            })
        )
    })
})
// END - EDIT CONSULTA

// DELETE CONSULTA
router.get('/delete/:id', (req, res) => {

    var id = req.params.id
    client.connect(err => {
        collection = client.db("crud").collection("consultas");
        collection.deleteOne({ _id: ObjectId(id) },
            ((err, results) => {
                if (err) return console.log(err)
                console.log('CONSULTA was deleted')
            })
        )
    })
})
// END - DELETE CONSULTA

module.exports = router;