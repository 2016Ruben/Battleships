//set size
var rows = 10;
var cols = 10;
var squareSize = 50;
let hitCount = 0;
var direction = "horizontal";
var numShips = 5;
var placedShips = 0;

const gridContainer = document.getElementById("Grid");

//create the grid
//for the second player: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode "node.cloneNode()"
//for now need to create 10 * 10 = 100 divs
var createGrid = function () {
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {

            var square = document.createElement("div");
            gridContainer.appendChild(square);    //append the created div to the section named grid

            square.id = 'id' + j + i;    //will be a string because of the "id"      https://stackoverflow.com/questions/19625646/javascript-adding-an-id-attribute-to-another-created-element

            // set each grid square's coordinates: multiples of the current row or column number
            var topPosition = j * squareSize;
            var leftPosition = i * squareSize;

            // use CSS absolute positioning to place each grid square on the page
            square.style.top = topPosition + 'px';
            square.style.left = leftPosition + 'px';

        }
    }
}


var myGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// var enemyGrid = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]

//code for the clicking on the squares       https://www.kirupa.com/html5/handling_events_for_many_elements.htm
// TODO: send the chosen DIV to the other player so it can be displayed there
function fire(e) {
    //gets the row and col number
    if (e.target !== e.currentTarget) {
        var row = e.target.id.substring(2, 3);
        var col = e.target.id.substring(3, 4);
        //alert("row " + row + " col " + col);

        //retrieving the id of the clicked div
        var myElement = document.querySelector("#" + e.target.id)
        //changes the color and the number in the array
        if (enemyGrid[row][col] == 0) {
            myElement.style.background = "#5984C5";
            enemyGrid[row][col] = 3;
        } else if (enemyGrid[row][col] == 1) {
            myElement.style.backgroundColor = "#C45858";
            enemyGrid[row][col] = 2;

            hitCount++;

            isWon();
        } else if (enemyGrid[row][col] > 1) {
            alert("you already hit this shit")
        }
    }
    e.stopPropagation();
}

function isWon(e) {
    //Timer needed for the display of color BEFORE the alert
    setTimeout(function () {
        if (hitCount >= 20) {
            alert("All enemy ships have been sunk");
        }
    }, 10)
}

var directionButton = document.getElementById("direction");
directionButton.onclick = function directionSwitch() {
    if (direction === "horizontal") {
        direction = "vertical";
    } else {
        direction = "horizontal";
    }
    alert("The direction is now: " + direction);
}


// TODO: make part of setup DONE

var placeShips = function placeShips(callback) {
    gridContainer.addEventListener("click", place, true);
    function place(e) {
        if (e.target !== e.currentTarget) {
            if (placedShips < 5) {
                var rowTest = e.target.id.substring(2, 3);
                var colTest = e.target.id.substring(3, 4);

                var availableCols = cols - ships[placedShips].size;
                var availableRows = rows - ships[placedShips].size;

                //alert(availableCols + "and" + availableRows);

                //check rows/cols availability
                if ((direction === "horizontal" && availableCols >= colTest) || (direction === "vertical" && availableRows >= rowTest)) {
                    //check if there already is a ship placed on the grid
                    var colTest2 = colTest;
                    var rowTest2 = rowTest;
                    var placed = false;
                    for (k = 0; k < ships[placedShips].size; k++) {
                        if (myGrid[rowTest2][colTest2] === 1) {
                            placed = true;
                        }
                        if (direction === "horizontal") {
                            colTest2++;
                        } else {
                            rowTest2++;
                        }
                    }

                    //place the ship
                    if (placed === false) {
                        for (j = 0; j < ships[placedShips].size; j++) {
                            myGrid[rowTest][colTest] = 1;

                            if (direction === "horizontal") {
                                colTest++;
                            } else {
                                rowTest++;
                            }
                        }
                        alert("Ship placed :)")
                    }
                }

                //If you clicked wrong, decrement x so the loop fires once again
                else {
                    alert("Please choose a valid place");
                    placedShips--;
                }
                if (placed === true) {
                    alert("Already placed a ship here");
                    placedShips--;
                }

                //If all the ships are palced, replace the click event from place to fire
                if (placedShips >= 4) {
                    gridContainer.removeEventListener("click", place);
                    gridContainer.addEventListener("click", fire, true);
                    //SEND THE MADE GRID TO THE ENEMY PLAYER TO PLAY WITH
                    callback();
                }
            }
            placedShips++;
        }
        e.stopPropagation();
    }
}

//Create the ships
ship2 = {
    "size": 2,
    "name": "Partol Boat"
}

ship3 = {
    "size": 3,
    "name": "Destroyer"
}

ship4 = {
    "size": 4,
    "name": "Battleship"
}

ship5 = {
    "size": 5,
    "name": "Carrier"
}

ship6 = {
    "size": 6,
    "name": "Dikke Unit"
}

ships = [ship2, ship3, ship4, ship5, ship6];

//Messages
T_SEND_SHIPS = "SEND-SHIPS";
O_SEND_SHIPS = {
    type: T_SEND_SHIPS,
    data: null
};



(function setUp() {
    createGrid();       //create the board (100 divs)
    placeShips(send);       //place the ships in myGrid

    // TODO: send your placed ships to the enemy USING message
    //The second argument alters the contents of the string before returning it. 
    //The third argument specifies how many spaces to use as white space for readability.
    alert(JSON.stringify(O_SEND_SHIPS));

    let outgoingMsg = O_SEND_SHIPS;
    outgoingMsg.data = myGrid;

    alert(JSON.stringify(outgoingMsg));

    //Send the grid as a message to the server
    function send() {
        let outgoingMsg = O_SEND_SHIPS;
        outgoingMsg.data = myGrid;
        socket.send(JSON.stringify(outgoingMsg));
    }

    //assigned myGrid to outgoingMsg.data, now send it to server
    //socket.send(JSON.stringify(outgoingMsg));

    //server & socket code etc
    var socket = new WebSocket("ws://localhost:3000");

    //What to do when a connection is opened
    socket.onopen = function () {
        alert("OPENED WebSocket :)");
        //socket.send(JSON.stringify(outgoingMsg));             //test
    };

    //What to do when recieving a message
    socket.onmessage = function(event) {
        let incomingMsg = JSON.parse(event.data);
        alert(JSON.stringify(incomingMsg));
        //check what message it is 
        if (incomingMsg.type == "SEND-SHIPS") {
            enemyGrid = incomingMsg.data;
            alert(enemyGrid);

        }
    };
})(); //immediately invoked by ();