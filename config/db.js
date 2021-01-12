var mongoose = require('mongoose')
var Promise = require('bluebird')
Promise.promisifyAll(mongoose)
var options = {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    keepAlive: 1,
    bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
mongoose.connect('mongodb+srv://Dev:pass@123@dev.oqyf3.mongodb.net/customer', options, function (err, db) {
  if (err) {
    throw err
  }
  global.mongodb = db
})

mongoose.connection.on('error', function (e) {
  if (process.env.NODE_ENV != 'local') {
    console.log("ijsbndfihb")
  }

//   logger.error('Mongo failed to connect : ');
//   logger.error(e);
  console.log('db: mongodb error ' + e)
  // reconnect here
})

mongoose.connection.on('connected', function (e) {
  console.log('db: mongodb is connected: ')
})

mongoose.connection.on('disconnected', function () {
  console.log('db: mongodb is disconnected')
})

mongoose.connection.on('reconnected', function () {
  console.log('db: mongodb is reconnected: ')
})

mongoose.connection.on('timeout', function (e) {
  console.log('db: mongodb timeout ' + e)
  // reconnect here
})

mongoose.connection.on('close', function () {
  console.log('db: mongodb connection closed')
})

module.exports = mongoose;