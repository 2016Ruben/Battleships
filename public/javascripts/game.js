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

let hitCount = 0;

//code for the clicking on the squares       https://www.kirupa.com/html5/handling_events_for_many_elements.htm
gridContainer.addEventListener("click", fire, false);
 
function fire(e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        alert("This div has id: " + clickedItem);
    }
    e.stopPropagation();
}



//create the ships
const battleship2 = {
    "size" : 2,
    "name" : "Patrol Boat"
};

const battleship3 = {
    "size" : 3,
    "name" : "Destroyer"
};

const battleship4 = {
    "size" : 4,
    "name" : "Battleship"
};

const battleship5 = {
    "size" : 5,
    "name" : "Carrier"
};

const battleship6 = {
    "size" : 6,
    "name" : "Dikke Unit"
};