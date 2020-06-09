var express = require('express')
var router = express.Router()
var { client } = require('./../mongo')

client.connect(err => {
    collection = client.db("crud").collection("ocorrencias");
})

router.get('/list', (req, res) => {
    client.connect(err => {
        collection = client.db("crud").collection("pets");
        collection.find().toArray((err, results) => {
            if (err) return console.log(err)
            res.json(results)
        })
    })
})

// ADD USER
router.post('/add', (req, res) => {
    client.connect(err => {
        collection = client.db("crud").collection("pets");
        collection.insertOne(req.body, function (err, res) {
            if (err) throw err;
            console.log("User was added");
        });
    })
})
// END - ADD USER

// EDIT USER
router.post('/edit/', (req, res) => {

    var data = req.body;
    var id = data.id
    delete data.id;
    client.connect(err => {
        collection = client.db("crud").collection("pets");

        collection.updateOne({ _id: ObjectId(id) }, { $set: data },
            ((err, results) => {
                if (err) return console.log(err)
                res.redirect('/')
                console.log('User was updated')
            })
        )
    })
})
// END - EDIT USER

// DELETE USER
router.get('/delete/:id', (req, res) => {

    var id = req.params.id

    client.connect(err => {
        collection = client.db("crud").collection("pets");
        collection.deleteOne({ _id: ObjectId(id) },
            ((err, results) => {
                if (err) return console.log(err)
                res.redirect('/')
                console.log('User was deleted')
            })
        )
    })
})
// END - DELETE USER

module.exports = router;