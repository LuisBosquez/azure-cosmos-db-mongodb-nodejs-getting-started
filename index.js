const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('./config');

// Connection URL
const url = 'mongodb://' + config.username + ':' + config.key + '@' + config.endpoint + ':10255';

// Database Name
const dbName = config.databaseId;

// Create a new MongoClient
const client = new MongoClient(url, 
{ 
  tls: true,
  useUnifiedTopology: true
});

// Insert a document with an auto-generated GUID
function insertDocument(db, coll, document, callback)
{
  coll.insertOne(document, function(err, result){
    assert.equal(err, null);
    console.log("Inserted some document");
  })

  callback();
}

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const coll = db.collection(config.containerId);

  insertDocument(db, coll, {}, client.close);

});
