var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

var routes = require('./routes/index')

app.use('/', routes);

//creating the webSockets etc.
var server = http.createServer(app);
const wss = new websocket.Server({ server });

wss.on("connection", function(ws) {

//what to do on connection
    console.log("Connected...");
    ws.on("message", function incoming(message) {
        console.log("This message was created and send via game.js: " + message);
    });

});


wss.on("close", function connection() {
    //what to do on close
        console.log("Connection closed...");
    
    });

server.listen(3000);