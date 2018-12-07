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
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]

var numShips = 5;

function placeShips(){

}


let hitCount = 0;
//code for the clicking on the squares       https://www.kirupa.com/html5/handling_events_for_many_elements.htm
gridContainer.addEventListener("click", fire, false);
 
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
        }else if (grid[row][col] == 1){
            myElement.style.backgroundColor = "#C45858";
            grid[row][col] = 2;

            hitCount++;

            isWon();
        }else if (grid[row][col] > 1){
            alert("you already hit this shit")
        }
    }
    e.stopPropagation();
}

function isWon(e) {
    setTimeout(function() {
        if (hitCount > 19){
            alert("All enemy ships have been sunk");
        }},10)
}


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







