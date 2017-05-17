var http = require('http'),
  path = require('path'),
  os = require('os'),
  fs = require('fs');

var Busboy = require('busboy');

http.createServer(function(req, res) {
  if (req.method === 'POST') {
    console.log("Got a post request")

    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join("/home/joins/luke/nodejsapp/", path.basename(filename));
      console.log("Saving " + fieldname + " to " + saveTo.toString())
      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });

    return req.pipe(busboy);
  }

  res.writeHead(404);
  res.end();
}).listen(3000, function() {
  console.log('Listening for requests');
});
