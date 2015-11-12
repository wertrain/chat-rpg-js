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
                id: socket.id,
                moveInfo: {}
            };
            socket.emit('connected', player);
            socket.broadcast.emit('join', player);
            socket.emit('members', players);

            players[socket.id] = player;
            
            var msg = name + '(' + socket.id + ')' + 'が入室しました ';
            console.log(msg);
        });
        socket.on('disconnect', function () {
            var player = players[socket.id];
            
            if (typeof player !== 'undefined') {
                socket.broadcast.emit('leave', player);
                
                var msg = player.name + '(' + socket.id + ')' + 'が退室しました ';
                console.log(msg);
                
                delete players[socket.id];
            }
        });
        socket.on('message', function (message) {
            socket.broadcast.emit('message', message);
            socket.emit('message', message);
        });
        socket.on('move', function (object) {
            players[socket.id].moveInfo = object;
            socket.broadcast.emit('move', object);
        });
    });
    
    server.listen(8080);
})();
