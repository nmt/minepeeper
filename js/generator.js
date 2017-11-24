$(document).ready(main);
$(document).ready(myFunction);
var init = false;

var width = 8;
var height = 10;
var bombCount = 10;
var bombList = new Set();

var grid = [];

function main() {
	if (!init){
		generateGrid();
		placeBombs();
		printGrid();

		init = true;
	}
}

var cellValue = [];

function myFunction() {
	$('.grid > span').click(function() {
		// maybe just get the data attribute of the cell
		var currentId = this.id;
		var params = currentId.split('-');
		openCell(params[0], params[1]);
		console.log('open cell');

		for(var i = 0; i < cellValue.length; i++){
			// console.log(cellValue[i]);
			$(cellValue[i]).html('B');
		}
	});
}

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
}

/**
 * Generates N bombs within the grid.
 */
function placeBombs() {
	var x, y;

	for (var i = 0; i < bombCount; i++){
		x = Math.floor(Math.random() * height);
		y = Math.floor(Math.random() * width);

		// Only place a bomb if the area is clear!
		if (!isBomb(x,y)){
			bombList.add(x + ' ' + y);
			grid[x][y] = 'X';
			generateHints(x,y);
		}
		else {
			i--;
		}
	}
}

/**
 * Adds hint numbers for each cell surround a bomb
 */
function generateHints(x, y) {
	for (var i = (x - 1); i < (x + 2); i++){			// Left to right of the bomb
		if (i >= 0 && i < height){						// Don't go beyond the sides of the grid!
			for (var j = (y - 1); j < (y + 2); j++){	// Top to bottom of bomb
				if (j >= 0 && j < width){
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
	// var style = '';

	for (var i = 0; i < height; i++){
		for (var j = 0; j < width; j++){
			// style = determineColour(grid[i][j]);
			print += '<span id=\"' + i + '-' + j + '\"' + ' data-attribute=\"' + grid[i][j] + '\"\>' + grid[i][j] + '</span>';
		}
		print += '<br>';
	}
	$('.grid').html(print);
}

function determineColour(cell) {
		switch (cell) {
			case 1:
				return 'hintOne';
			case 2:
				return 'hintTwo';
			case 3:
				return 'hintThree';
			default:
				return '';
		}
}

function isBomb(x, y) {
	return (grid[x][y] === 'X');
}

var zeroSegmentList = new Set();

function openCell(x, y) {
	zeroSegmentList.clear();

	x = parseInt(x);
	y = parseInt(y);

	zeroSegmentList.add('#' + x + '-' + y);

	var numbers = [];

	switch (grid[x][y]){
		case 0:
			zeroSegmentList.forEach((element) => {
				numbers = element.split('');

				x = parseInt(numbers[1]);
				y = parseInt(numbers[3]);

				for (var i = (x - 1); i < (x + 2); i++){
					if (i >= 0 && i < height){
						for (var j = (y - 1); j < (y + 2); j++){
							if (j >= 0 && j < width){
								if (grid[i][j] === 0){
									zeroSegmentList.add('#' + i + '-' + j);
									cellValue.push('#' + i + '-' + j);
								}
							}
						}
					}
				}
			});
			return zeroSegmentList;
		case 'X':
			// Game over
			break;
		default:
			cellValue.push('#' + x + '-' + y);
			break;
	}
}

function changeCellState(x, y) {
}