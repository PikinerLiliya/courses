var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  req.reqDate = new Date();

  next();
});

app.get('/news/:id', function (req, res, next) {
  var id = req.params.id;

  res.status(200).send({id: id, reqDate: req.reqDate})
});

app.post('/news', function (req, res, next) {
  var body = req.body;

  res.status(200).send({body: body})
});

app.listen(port, function () {
  console.log('server listening on port ' + port);
});
