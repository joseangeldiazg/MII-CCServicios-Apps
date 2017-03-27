// models/index.js
if (!global.hasOwnProperty('db')) {

  var mongoose = require('mongoose');

  var dbName = 'express'

  // the application is executed on the local machine ...
  mongoose.connect('mongodb://localhost/' + dbName);


  global.db = {

    mongoose: mongoose,

    //models
    user:           require('./user')(mongoose),
  };

}

module.exports = global.db;
