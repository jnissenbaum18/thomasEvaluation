var mongoose = require('mongoose');

var getConfig = require('../config/dbConfig.js');

let db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('connected', function(){
    console.log('Connected to database, status: ', db.readyState);
});
db.on('error', console.error.bind(console, "MongoDB connection error: "));

async function initDBConnection () {
    const configs = await getConfig();

    mongoose.connect(configs.uri, {
        user: configs.mongouser,
        pass: configs.mongopass,
        useNewUrlParser: true
    });
}; 

initDBConnection().catch(error => console.error(error));

module.exports = db;