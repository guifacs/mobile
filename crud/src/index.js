const express = require('express')
const bodyparser = require('body-parser')
var { client } = require('./mongo')
var app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/consultas', require('./Controllers/ConsultasController'))
app.use('/ocorrencias', require('./Controllers/OcorrenciasController'))
app.use('/pets', require('./Controllers/PetsController'))

function cleanup() {
    client.close()
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

app.listen(3000, () => {
    console.log("Server started")
});