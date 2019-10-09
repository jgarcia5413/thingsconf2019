const MongoClient = require('mongodb').MongoClient;

const config = require('./config');

const uri = 'mongodb+srv://' + config.mongodb.user + ':'
            + config.mongodb.password + '@'
            + config.mongodb.hostname + '/admin?retryWrites=true&w=majority'

const options = { useNewUrlParser: true, useUnifiedTopology: true};

const collectionName = config.mongodb.collection;

let database = null;

async function attachDatabase() {
  const connection = await MongoClient.connect(uri, options);
  database = connection.db(config.mongodb.database);
}

async function getDatabase() {
  if (!database) await attachDatabase();
  console.log('db connected');
  return database;
}

async function insertDocument(data) {
  const database = await getDatabase();
  return await database.collection(collectionName).insertOne(data), function (err, result) {
      if (err != null) {
          console.log("ERROR: " + err);
          throw err;
      }
      console.log(result);
  };
}

//return eventData array for most recent count of events, by device
async function getArray(device, count) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({
    device: device
  }).limit(parseInt(count)).sort({
    $natural: -1
  }).toArray();
}

module.exports = {
  insertDocument,
  getArray
};