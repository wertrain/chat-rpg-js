/**
 * @fileoverview socket.io に関する実装。
 */

(function(namespace) {

    var port = 8080;
    var socket = io.connect("/", { port: port });
    
    // 起動時に名前を送信
    socketio.emit("connected", "テスト");
    
    socketio.on("connected", function(player) {
        console.log(player.name);
    });
    socketio.on("disconnect", function () {});

    var ns = chatrpg.common.addNamespace(namespace);
    ns.SocketIO = SocketIO;

}("chatrpg.network"));