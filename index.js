var app = require('http').createServer(handler).listen(9999);
var io = require('socket.io')(app);

function handler(req, res) {
  req.setEncoding('utf-8');
  var postData = "";
  req.addListener("data", function (postDataChunk) {
    postData += postDataChunk;
  });
  req.addListener("end", function () {
    try {
      var data = JSON.parse(postData);
      io.of('/' + data.topic).emit('news', data.msg);
      res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
      });
      res.end(JSON.stringify({ status: 'OK' }));
    } catch (e) {
      res.writeHead(400, {
        "Content-Type": "text/plain;charset=utf-8"
      });
      res.end(e.message);
    }
  });
}

var i = 1;
for (; i <= 20; i++) {
  io.of('/' + i);
}
