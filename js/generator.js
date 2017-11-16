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
	var printableRow = '';

	for (var i = 0; i < width; i++){
		// row.push('☐');
	}
	for (var j = 0; j < height; j++){
		grid.push(['☐','☐','☐','☐','☐','☐','☐','☐']);
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
		y = Math.floor(Math.random() * width);
		x = Math.floor(Math.random() * height);

        grid[x][y] = 'X';
	}
}

function printGrid() {
	var print = '';

	for (var i = 0; i < height; i++){
		for (var j = 0; j < width; j++){
			if (!isBomb(i,j)){
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

function isBomb(x, y) {
	if (grid[x][y] === 'X'){
		return true;
	}
	else
		return false;
}