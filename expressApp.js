var express = require('express')
var app = express()
var path = require('path');
var fs = require('fs');

var bowerPath = path.join(__dirname, 'bower_components');
console.log('my __dirname: ', __dirname);
console.log('my __dirname full: ', path.join(__dirname, 'bower_components'));


app.use(express.static(bowerPath));

app.get('/', function (req, res) {
  serveIndex(res);
})

var serveIndex = function (res) {
  fs.readFile('coffee.html', function (err, html) {
    if (err) { 
      console.log('fs read err: ', err);
      res.end('sorry err!');
    } else {
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(html);  // <-- HERE!
      res.end();
    }
  });
};

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
