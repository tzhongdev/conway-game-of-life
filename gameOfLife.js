"use_strict";

// Declaring constants for world 

const X = 15;
const Y = 15;


// Init world
// Create an [12][12] canvas for [10][10] world
// Set start population random 60% cells that live 


function initWorld() {
	var canvas = [X];
	for (var i = 0; i < Y; i++) {
		canvas[i] = new Array(X);
		for (var j = 0; j < X; j++) {
			if (i < 1 || i >= Y-1 || j < 1 || j >= X-1) {
				// Rand
				canvas[i][j] = false;
			} else {
				// 60% life rate 
				canvas[i][j] = Math.random() > 0.4;
			}
		}
		
	}
	return canvas;
}

function printWorld(world) {
	
	for (var i = 1; i < Y-1; i++) {
		var result = "";
		for (var j = 1; j < X-1; j++) {
			if (world[i][j]) {
				//alive
				result += "X";
			} else {
				result += " ";
			}
			result += " ";
		}
		console.log(result);
	}

}

// apply the four rules to the cells

function deadOrAlive(world) {
	var numOfNeighbors;
	for (var i = 1; i < Y-1; i++) {
		for (var j = 1; j < X-1; j++) {
			numOfNeighbors = countNeighbor(i, j, world);
		
			// apply 4 rules
			// true if cell is alive and neigbhours are 2 or alive or dead but neighbours are 3
			world[i][j] = ((world[i][j] && (numOfNeighbors === 2)) || (numOfNeighbors === 3))	

		}
	}
	return world;
}

// counts the neighbours of each cell

function countNeighbor(i, j, world){
	var count = 0;
	for (var m = i-1; m <= i+1; m++) {
		for (var n = j-1; n <= j+1; n++) {
			// console.log("m:" + m +" "+" n: "+n);
			if (world[m][n]) {
				// console.log("count: "+count);
				count += 1; 
			}
		}
	}
	return world[i][j] ? count-- : count;

}

// MAIN global

var canvas = initWorld();

console.log("Start popultation: ");
printWorld(canvas);


// prints every 3 seconds new generation

var genCounter = 1;
setInterval(function() {
	canvas = deadOrAlive(canvas);   // gives us the new generation	
    console.log(genCounter+". Generation: "); 
	printWorld(canvas);
	genCounter++;
    
	}, 3000);








