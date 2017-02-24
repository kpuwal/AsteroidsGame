var serialserver = require('p5.serialserver');
var express = require('express');

var portName = process.argv[2];
var app = express();
var port = process.env.PORT || 3000;
var storage = require('node-persist');

serialserver.start();
console.log(" -->  Glove will connect to serial port: " + portName);

app.use(express.static('./public'));
app.get('/', function (req, res) {
  res.send(index.html);
});

app.listen(port, function () {
  console.log(' -->  Huston is listening on port localhost:' + port);
});
