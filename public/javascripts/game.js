//set size
var rows = 10;
var cols = 10;
var squareSize = 50;

const gridContainer = document.getElementById("Grid");

//create the grid
//for the second player: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode "node.cloneNode()"
//for now need to create 10 * 10 = 100 divs
for(i = 0; i < cols; i++) {
    for(j = 0; j < rows; j++) {
        
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

var grid = [
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0]
]

let hitCount = 0;
//code for the clicking on the squares       https://www.kirupa.com/html5/handling_events_for_many_elements.htm

gridContainer.addEventListener("click", place, true);

 
function fire(e) {
    //gets the row and col number
    if (e.target !== e.currentTarget) {
        var row = e.target.id.substring(2,3);
        var col = e.target.id.substring(3,4);
        //alert("row " + row + " col " + col);
        
        //retrieving the id of the clicked div
        var myElement = document.querySelector("#" + e.target.id)
        //changes the color and the number in the array
        if (grid[row][col] == 0){ 
            myElement.style.background = "#5984C5";
            grid[row][col] = 3;
        } else if (grid[row][col] == 1){
            myElement.style.backgroundColor = "#C45858";
            grid[row][col] = 2;

            hitCount++;

            isWon();
        } else if (grid[row][col] > 1){
            alert("you already hit this shit")
        }
    }
    e.stopPropagation();
}

function isWon(e) {
    //Timer needed for the display of color BEFORE the alert
    setTimeout(function() {
        if (hitCount > 9){
            alert("All enemy ships have been sunk");
        }},10)
}


//for (i = 0; i < numShips; i++) {
//    for(){
//
//   }
//}

function place(e) {
    if (e.target !== e.currentTarget) {
        var rowTest = e.target.id.substring(2,3);
        var colTest = e.target.id.substring(3,4);

        for(i = 0; i < 5; i++){
            var availableCols = cols - ships[i].size;
            var availableRows = rows - ships[i].size;
            alert(availableCols + "and" + availableRows);

            var direction = "horizontal";   //TO-DO make button for this
            //var selectedShip = ship2;       //TO-DO make button for this

            //alert("changed row: " +  rowTest + ", col: " + colTest);
            //check rows/cols availability

            if ((direction === "horizontal" && availableCols >= colTest) || (direction === "vertical" && availableRows >= rowTest)) {
                for (j = 0; j < ships[i].size; j++) { //does the loop twice TO-DO make size variable
                    grid[rowTest][colTest] =  1;
            
                    if (direction === "horizontal") {
                        colTest++;
                    } else {
                        rowTest++;  
                    }
                }
            }
        }
    }
    e.stopPropagation();
}

//Create the ships
var numShips = 5;

ship2 = {
    "size" : 2,
    "name" : "Partol Boat"
}

ship3 = {
    "size" : 3,
    "name" : "Destroyer"
}

ship4 = {
    "size" : 4,
    "name" : "Battleship"
}

ship5 = {
    "size" : 5,
    "name" : "Carrier"
}

ship6 = {
    "size" : 6,
    "name" : "Dikke Unit"
}

ships = [ship2, ship3, ship4, ship5, ship6];