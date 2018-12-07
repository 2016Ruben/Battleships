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

//code for the clicking on the squares       https://www.kirupa.com/html5/handling_events_for_many_elements.htm
gridContainer.addEventListener("click", fire, false);
 
function fire(e) {
    //controli
    if (e.target !== e.currentTarget) {
        var row = e.target.id.substring(2,3);
        var col = e.target.id.substring(3,4);
        //alert("row " + row + " col " + col);

        var myElement = document.querySelector("#" + e.target.id)
        if (grid[row][col] == 0){ 
            myElement.style.background = 'blue';
            grid[row][col] = 3;
        }else if (grid[row][col] == 1){
            myElement.style.backgroundColor = 'red';
            grid[row][col] = 2;

            hitCount++;
            
            if (hitCount == 20){
                alert("All enemy ships have been sunk");
            }

        }else if (grid[row][col] > 1){
            alert("you already hit this shit")
        }
    }


    e.stopPropagation();
}