/**
 * @fileoverview socket.io に関する実装。
 */
(function(namespace) {
    //var port = 8080;
    //var socketio = io.connect('/', { port: port });
    var socketio = io.connect('http://localhost:8080');
    var playerInfo = {
        name: '', id: ''
    };
    var messageCallback = function(name, message) {};
    
    socketio.on('connected', function(player) {
        playerInfo.name = player.name;
        playerInfo.id = player.id;
    });
    socketio.on('join', function(player) {
        console.log(player.id);
    });
    socketio.on('message', function(object) {
        messageCallback(object.name, object.message);
    });
    socketio.on('disconnect', function () {});
    
    var login = function(name) {
        playerInfo.name = name;
        socketio.emit('connected', name);
    }
    var getPlayerInfo = function() {
        return playerInfo;
    }
    var talk = function(message) {
        var object = {name: playerInfo.name, message: message};
        socketio.emit('message', object);
    }
    var setMessageCallback = function(callback) {
        messageCallback = callback;
    }
    
    var ns = chatrpg.common.addNamespace(namespace);
    ns.login = login;
    ns.talk = talk;
    ns.getPlayerInfo = getPlayerInfo;
    ns.setMessageCallback = setMessageCallback;
}('chatrpg.network'));