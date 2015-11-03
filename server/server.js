(function() {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname + '/build'));

    var http = require('http');
    var server = http.createServer(app);
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
      
        socket.on('connected', function (name) {
            var msg = name + 'が入室しました';
            console.log(msg);
            //io.sockets.emit('publish', {value: msg});
        });

    });
    
    server.listen(8080);
})();
