//https://nodejs.org/en/about/


const express = require('express')
const app = express();
var http = require('http');
// filesystem
let filesystem = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {

  
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


var server = http.createServer(function (req, resp) {
    // var publicDir = require('path').join(__dirname, '/public');
    // app.use(express.static(publicDir));
  // reads in the file index.html
  filesystem.readFile("index.html", function (error, pgResp) {
      if (error) {
          resp.writeHead(404);
          resp.write('Contents you are looking are Not Found');
      } else {
          resp.writeHead(200, { 'Content-Type': 'text/html' });
          resp.write(pgResp);
      }
        
      resp.end();
  });
     
});
//5.
server.listen(port);
 
console.log('Server Started listening on ' + port);