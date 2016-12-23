var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var storage = require('node-persist');


app.use(express.static('./app/public'));

app.get('/', function (req, res) {
  res.send(index.html);
});

app.listen(port, function () {
  console.log('Huston is listening on port: 3000');
});
