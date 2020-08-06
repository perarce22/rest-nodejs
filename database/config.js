const mongoose = require('mongoose');

// const dbName = "myDb2";

var config = {};

config.database ="mongodb://6c3e5d36ecfe015fe709476f213b943e:Welcome2018_@9b.mongo.evennode.com:27017/6c3e5d36ecfe015fe709476f213b943e?readPreference=primaryPreferred&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";

config.connect = function()
{
    mongoose.connect(config.database,{ useUnifiedTopology: true, useNewUrlParser: true })
}

config.connection = function() 
{
    if(mongose.connection)
        return mongoose.connection;
    return this.connect();
}

module.exports = config;