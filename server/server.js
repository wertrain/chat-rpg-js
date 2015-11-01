// 1.モジュールオブジェクトの初期化
var fs = require("fs");
var server = require("http").createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./client/index.html", "utf-8");
     res.end(output);
}).listen(8080);
var io = require("socket.io").listen(server);

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

    // 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
    socket.on("connected", function (name) {
        var msg = name + "が入室しました";
        console.log(msg);
        //io.sockets.emit("publish", {value: msg});
    });

});