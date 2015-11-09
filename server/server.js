/**
 * @fileoverview サーバ側の実装。
 */
(function() {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname + '/build'));

    var http = require('http');
    var server = http.createServer(app);
    var io = require('socket.io').listen(server);

    var players = [];
    io.sockets.on('connection', function (socket) {
        socket.on('connected', function (name) {
            var player = {
                name: name,
                id: socket.id
            };
            socket.emit('connected', player);
            socket.broadcast.emit('join', player);
            
            players[socket.id] = player;
            var msg = name + '(' + socket.id + ')' + 'が入室しました ';
            console.log(msg);
        });
        
        socket.on('message', function (message) {
            socket.broadcast.emit('message', message);
            socket.emit('message', message);
            //console.log(message);
        });

    });
    
    server.listen(8080);
})();
