var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();
var port = 3030;

// var connection = mongoose.createConnection('mongodb://localhost:27017/testDb');
mongoose.connect('mongodb://localhost:27017/testDb');
var connection = mongoose.connection;

connection.once('connected', function () {
  console.log('-----connected to DB------');

  var UsersSchema = new Schema({
    name: String,
    age: { type: Number, default: 25 }
  }, { collection: 'users' });

  var UserModel = mongoose.model('User', UsersSchema);

  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    req.reqDate = new Date();

    next();
  });

  app.get('/users', function (req, res, next) {
    UserModel.find({}, function (err, users) {
      if (err){
        return next(err);
      }

      res.status(200).send({ users: users })
    });
  });

  app.post('/news', function (req, res, next) {
    var body = req.body;

    res.status(200).send({ body: body })
  });

  app.listen(port, function () {
    console.log('server listening on port ' + port);
  });
});

connection.on('error', function (err) {
  console.log('Error', err);

  process.exit(1);
});

