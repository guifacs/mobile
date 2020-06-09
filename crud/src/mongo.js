const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:clFVk2JkG9vASeAs@cluster0-6nqqr.gcp.mongodb.net/test?retryWrites=true&w=majority";
module.exports = {
    client: new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }),
    getCollections: () => { client.getCollectionNames() }
}

