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

const insertDocuments = function(db, collection, callback) {
  // Insert some documents
  collection.insertMany([
    {source: "Linux VM, Ubuntu 18.04"}
   ], function(err, result) {
    assert.equal(err, null);
    console.log("Inserted document");
    callback(result);
  });
}

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  const db = client.db(dbName);
  const coll = db.collection(config.containerId);

  insertDocuments(db, coll, function(){
    client.close();
  });

});
