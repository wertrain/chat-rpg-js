/**
 * @fileoverview socket.io に関する実装。
 */
(function(namespace) {
    var port = 8080;
    var socketio = io.connect('/', { port: port });
    //var socketio = io.connect('http://localhost:8080');
    var playerInfo = {
        name: '', id: ''
    };
    var messageCallback = function(name, message) {};
    var eventCallback = [];
    var eventType = {
        JOIN: 'Join',
        MEMBERS: 'Members',
        LEAVE: 'Leave',
        MESSAGE: 'Message',
        MOVE: 'Move'
    };
    
    socketio.on('connected', function(player) {
        playerInfo.name = player.name;
        playerInfo.id = player.id;
    });
    socketio.on('join', function(player) {
        eventCallback[eventType.JOIN](player);
        eventCallback[eventType.MESSAGE]('システム', player.name + 'さんが入室しました。');
    });
    socketio.on('members', function(object) {
        eventCallback[eventType.MEMBERS](object);
    });
    socketio.on('leave', function(player) {
        eventCallback[eventType.LEAVE](player);
        eventCallback[eventType.MESSAGE]('システム', player.name + 'さんが退室しました。');
    });
    socketio.on('message', function(object) {
        eventCallback[eventType.MESSAGE](object.name, object.message, object.id);
    });
    socketio.on('move', function(object) {
        eventCallback[eventType.MOVE](object);
    });
    socketio.on('disconnect', function () {});
    
    var login = function(name) {
        playerInfo.name = name;
        socketio.emit('connected', name);
    }
    var move = function(object) {
        object.playerInfo = playerInfo;
        socketio.emit('move', object);
    }
    var getPlayerInfo = function() {
        return playerInfo;
    }
    var talk = function(message) {
        var object = {name: playerInfo.name, message: message, id: playerInfo.id};
        socketio.emit('message', object);
    }
    var setMessageCallback = function(callback) {
        messageCallback = callback;
    }
    var setEventCallback = function(eventType, callback) {
        eventCallback[eventType] = callback;
    }
    
    var ns = chatrpg.common.addNamespace(namespace);
    ns.login = login;
    ns.talk = talk;
    ns.move = move;
    ns.getPlayerInfo = getPlayerInfo;
    ns.Event = eventType;
    ns.setEventCallback = setEventCallback;
}('chatrpg.network'));