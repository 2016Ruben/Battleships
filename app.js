var express = require("express");
var http = require("http");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);







var websockets = {}; //property:websocket, value: game


var currentGame = new Game(gameStutus.gamesInitialized++);
var connectionID = 0; //each websocket receives a unique ID


wss.on("connection", function connection(ws) {


  /**
   * two players are added to the same game
   */
  let con = ws;
  con.id = connectionID++
  let playerType = currentGame.addPlayer(con);
  WebSockets[con.id] = currentGame;

  /**
   * inform the client about its assigned player type
   */
  con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);
}