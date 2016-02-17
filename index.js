var app = require('http').createServer(handler).listen(9999);
var io = require('socket.io')(app);

function handler(req, res) {
  req.setEncoding('utf-8');
  var postData = "";
  req.addListener("data", function (postDataChunk) {
    postData += postDataChunk;
  });
  req.addListener("end", function () {
    var data = JSON.parse(postData);
    console.log(data);
    io.of('/' + data.topic).emit('news', data.msg);
    res.writeHead(200, {
      "Content-Type": "application/json;charset=utf-8"
    });
    res.end(JSON.stringify({ status: 'OK' }));
  });
}

var i = 1;
for (; i <= 30; i++) {
  io.of('/' + i);
}
