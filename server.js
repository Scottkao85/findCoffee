var http = require('http');
var fs = require('fs');

fs.readFile('coffeeServer.html', function (err, html) {
  if (err) {
      throw err; 
  }      
  http.createServer(function (req, res) {

    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.write(html);  // <-- HERE!
    res.end();

  }).listen(1337, '127.0.0.1');
});

console.log('Server running at http://127.0.0.1:1337/');

//////
// fs.readFile('index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) { 
//         response.writeHeader(200, {"Content-Type": "text/html"});  // <-- HERE!
//         response.write(html);  // <-- HERE!
//         response.end();  
//     }).listen(1337, '127.0.0.1');
// });