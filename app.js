var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

//Waar komt dit vandaan eigenlijk?
// app.use("/", function(req, res) {
//     res.sendFile("public/test.html", {root: "./"});
// });

app.use(express.static(__dirname + "/public"));
//http.createServer(app).listen(port);      //<-- dit verneukte het     ?-hetzelfde als "server.listen(port);"-?

var routes = require('./routes/index');

app.use('/', routes);

var server = http.createServer(app);
const wss = new websocket.Server({ server });

//can be made with modules
var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
};

//adds a .addPlayer function to game Obbject/constructor
game.prototype.addPlayer = function (p) {          //prototpe is needed to be able to add a function to the cinstructor "game" SEE: https://www.w3schools.com/js/js_object_prototypes.asp

    if (this.playerA == null) {
        this.playerA = p;
        return 'A';
        console.log("Player A added: " + p);
    }

    if (this.playerB == null) {
        this.playerB = p;
        return 'B';
        console.log("Player B added: " + p);
    }
};

game.prototype.twoConnected = function () {      //checks if there are 2 players connected
    //means 2 players are connected, so you need to create a new gameObject to add new players to (done in the code of wss.on(connection))
    return (this.playerA != null && this.playerB != null);
};



//variables used
var games = 0;              //we need to display 3 stats, this is 1
//stat2
//stat3 
var websockets = {};        //will keep track of what webSocked is assigned to what game (Need to check if connectionID =/= websockets.id is correct)
var connectionID = 0;
var currentGame = new game(games++);

wss.on("connection", function (ws) {

    let con = ws;
    con.id = connectionID++;                //An ID assigned to the webSocket so you can track them to games etc.
    //console.log("ConnectionID: "+ connectionID);

    //Player will be A/B
    let player = currentGame.addPlayer(con);
    //console.log("Player: "+ player);

    websockets[con.id] = currentGame;
    //console.log(websockets);

    console.log("Player %s placed in game %s as %s", con.id, currentGame.id, player);       //combined all the logs (can uncomment them if needed)


    if (currentGame.twoConnected()) {           //If there exists an playerA && playerB this evaluates to true
        currentGame = new game(games++);
    }

    //console.log("Game: "+ games + "\n");        //because new game() uses games and after that increments it, this value displays the NEXT games value used 
    //console.log(websockets[con.id].playerA);
    //console.log(con);

    //define what to do when a message is incomming (e.g. display the move the enemy made)
    con.on("message", function incoming(message) {
        let gameObj = websockets[con.id];         //gets the game that is associated with the con.id, can call all the functions/variables of normal game object

        //Message = from playerA
        if (gameObj.id == con) {




        } else {
            //Message = from playerB




        }
    });

    //define what to do if the connection closes
    con.on("close", function () {

    });
});

server.listen(port);        //defining what port the server listenes to
