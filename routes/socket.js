const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 3001 });

const lookups = {};

wss.on('connection', function connection(ws) {

    ws.on('open', function open() {
        ws.send('something');
    });
        
    ws.on('message', function incoming(data) {
        console.log(data);
        var msgData = JSON.parse(data);
        if(msgData.status == "connection"){
            lookups[msgData.from] = ws;
        }
        if(msgData.status == "sendMsg"){
            var msgTo = lookups[msgData.to];
            var message = {
                "status":"receiveMsg",
                "msg":msgData.msg,
                "from":msgData.from
            };
            if (msgTo.readyState !== WebSocket.OPEN) {
                msgTo.send(message);
            } else {
                console.log("Connection Error");                
            }
        }
    });

    ws.on('close', function close() {
        for (var key in lookups) {
            if (lookups.hasOwnProperty(key)) {
            var con = lookups[key];
                if (con.readyState !== WebSocket.OPEN) {
                    delete lookups[key];
                }
            }
        }
    });

});