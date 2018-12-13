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

var websockets = {};

setInterval(function(){
    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let gameObj = websockets [i];
            if(gameObj.finalStatus!=null){
                console.log("deleting element " + i);
                delete websockets[i];
            }
        }
    }
}, 50000);

var currentGame = new Game(gameStatus.gamesIntialized++);
var connectionID = 0;

wss.on("connection", function(ws) {


    let con = ws;
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    con.send((playerType == "A") ? messages.S_player_A : messages.S_player_B);

});
