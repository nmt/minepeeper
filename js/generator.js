$(document).ready(generateGrid);

var width = 8;
var height = 10;
var bombCount = 10;

var grid = [];
var printableGrid = '';

/**
 * Generates the N by M grid specified by width and height parameters.
 */
function generateGrid() {
	var row = [];
	var printableRow = '';

	for (var i = 0; i < width; i++){
		row.push('☐');
		// printableRow += '☐ ';
	}
	for (var i = 0; i < height; i++){
		grid.push(row);
		// printableGrid += printableRow + '\n';
	}

	placeBombs();

	printGrid();
}

/**
 * Generates N bombs within the grid.
 */
function placeBombs() {
	var x, y;

	for (var i = 0; i < bombCount; i++){
		x = Math.floor(Math.random() * width);
		y = Math.floor(Math.random() * height);

		console.log(x + ' ' + y);

		grid[x][y] = 'X';
	}
}

function printGrid() {
	var print = '';

	for (var i = 0; i < height; i++){
		for (var j = 0; j < width; j++){
			if (!isBomb(grid[i][j])){
				print += '☐ ';
			}
			else {
				print += 'X ';
			}
		}
		print += '\n';
	}
	$('.grid').text(print);
}

// This part is not yet functional - how do I get functions to return a value?
function isBomb(x, y) {
	if (grid[x,y] === 'X'){
		return true;
	}
	else
		return false;
}