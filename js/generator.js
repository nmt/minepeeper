$(document).ready(generateGrid);

var width = 8;
var height = 10;
var bombCount = 10;

var row = [];
var grid = [];

/**
 * Generates the N by M grid specified by width and height parameters.
 */
function generateGrid() {
	for (var i = 0; i < height; i++){
		var row = [];
		for (var j = 0; j < width; j++){
			row.push(0);
		}
		grid.push(row);
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
		x = Math.floor(Math.random() * height);
		y = Math.floor(Math.random() * width);

		if (isBomb(x,y)){
			continue;
		}
		else {
			grid[x][y] = 'X';
			generateHints(x,y);
		}
	}
}

function generateHints(x, y) {
	for (var i = (x - 1); i < (x + 2); i++){
		if (i >= 0 && i < width){
			for (var j = (y - 1); j < (y + 2); j++){
				if (j >= 0 && j < height){
					if (!isBomb(i,j)){
						grid[i][j] += 1;
					}
				}
			}
		}
	}
}

function printGrid() {
	var print = '';

	for (var i = 0; i < height; i++){
		for (var j = 0; j < width; j++){
			print += grid[i][j];
		}
		print += '\n';
	}
	$('.grid').text(print);
}

function isBomb(x, y) {
	return (grid[x][y] === 'X');
}

function openCell(x, y) {
	// Reveal just the one cell
	if (grid[x][y] != 0){

	}

	// Open up that huge satisfying segment
	else {

	}
}