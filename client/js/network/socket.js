/**
 * @fileoverview socket.io に関する実装。
 */
(function(namespace) {
    //var port = 8080;
    //var socketio = io.connect('/', { port: port });
    var socketio = io.connect('http://localhost:8080');
    var loginName = '';
    var messageCallback = function(name, message) {};
    
    socketio.on('connected', function(player) {
        console.log(player.name);
    });
    socketio.on('message', function(message) {
        var messages = message.split(":");
        messageCallback(messages[0], messages[1]);
    });
    socketio.on('disconnect', function () {});
    
    var login = function(name) {
        loginName = name;
        socketio.emit('connected', name);
    }
    var getLoginName = function() {
        return loginName;
    }
    var talk = function(message) {
        socketio.emit('message', loginName + ':' + message);
    }
    var setMessageCallback = function(callback) {
        messageCallback = callback;
    }
    
    var ns = chatrpg.common.addNamespace(namespace);
    ns.login = login;
    ns.talk = talk;
    ns.getLoginName = getLoginName;
    ns.setMessageCallback = setMessageCallback;
}('chatrpg.network'));