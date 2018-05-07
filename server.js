var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var port = 3030;
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

// var connection = mongoose.createConnection('mongodb://localhost:27017/testDb');
mongoose.connect('mongodb://localhost:27017/testDb');
var connection = mongoose.connection;

connection.once('connected', function () {
  console.log('-----connected to DB------');

  app.use(bodyParser.json());

  app.use(expressSession({ // почитайте і запишіть собі на що ці параетри впливають
    name: 'test',
    key: 'testKey',
    secret: '1q2w3e4r5tdhgkdfhgejflkejgkdlgh8j0jge4547hh',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new MongoStore({
      url: 'mongodb://localhost:27017/testDb',
      autoReconnect: true,
      ssl: false
    }),

    cookie: {
      maxAge: 31 * 24 * 60 * 60 * 1000 // One month
    }
  }));

  require('./routes/index')(app);

  app.listen(port, function () {
    console.log('server listening on port ' + port);
  });
});

connection.on('error', function (err) {
  console.log('Error', err);

  process.exit(1);
});

