$(document).ready(main);

let debug = true;
var init = false;

var width = 8;
var height = 10;
var bombCount = 10;
var bombList = new Set();

var grid = [];

var gameOver = false;

var cellValue = new Set();

$('.mr-face').text('\:\)');

function main() {
	// Initialise the board once
	if (!init){
		initialise();
	}

	$('.reset-button').click(function() {
		reset();
	});

	$('.grid > .cell').click(function() {
		openCell(this.id);
	});
}

function initialise() {
	generateGrid();
	placeBombs();
	printGrid();
	gameOver = false;
	init = true;
}

function reset() {
	gameOver = false;
	bombList = new Set();
	cellValue = new Set();
	grid = [];
	generateGrid();
	resetGrid();
	placeBombs();
	reprintGrid();
}

function resetGrid() {
	let cells = $('.cell');
	for (var i = 0; i < cells.length; i++) {
		$(cells[i]).attr('class', 'cell');
		$(cells[i]).text('0');
		$(cells[i]).attr('data-value', 0);
	}
}

function reprintGrid() {
	let cells = $('.cell');
	let boop = 0;

	for (var i = 0; i < height; i++){
		for (var j = 0; j < width; j++){
			$(cells[boop]).text(grid[i][j]);
			$(cells[boop]).attr('data-value', grid[i][j]);
			boop++;
		}
	}
}

function openCell(currentId) {
	if (!gameOver){ 
		// maybe just get the data attribute of the cell
		var params = currentId.split('-');
		displayCell(params[0], params[1]);
		var x = parseInt(params[0]);
		var y = parseInt(params[1]);

		cellValue.forEach(element => {
			params = element.split('');
			x = parseInt(params[1]);
			y = parseInt(params[3]);

			$(element).html(grid[x][y]);
			$(element).attr({'class':determineColour(grid[x][y])});
		});
		cellValue.clear();

		$('.grid').on('contextmenu', function() {
			console.log(x + ' ' + y);
			flag(x, y);
		});
		$('.grid').on('mousedown', function() {
			$('.mr-face').text('\:O');
		});
		$('.grid').on('mouseup', function() {
			if (grid[x][y] !== 'X'){
				$('.mr-face').text('\:\)');
			}
			else {
				$('.mr-face').text('X\(');
			}
		});
	}
	else if (gameOver) {
		$('.grid').on('mousedown', function() {
			$('.mr-face').text('X\(');
		});
		$('.grid').on('mouseup', function() {
			$('.mr-face').text('X\(');
		});
	}
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

	for (var i = 0; i < height; i++){
		for (var j = 0; j < width; j++){
			if (debug === false) {
				print += '<div class="cell" id=\"' + i + '-' + j + '\"' + ' data-value=\"' + grid[i][j] + '\"\>' + '\\' + '</div>';
			}
			else {
				print += '<div class="cell" id=\"' + i + '-' + j + '\"' + ' data-value=\"' + grid[i][j] + '\"\>' + grid[i][j] + '</div>';
			}
		}
		print += '<br>';
	}
	$('.grid').html(print);
}

function flag(x, y) {
	document.getElementById(x + "-" + y).innerHTML = '>';
}

/**
 * @param {*} cell	Cell of interest
 * @returns			Class name to colour a cell
 */
function determineColour(cell) {
	switch (cell) {
		case 0: return 'cell hintZero';
		case 1: return 'cell hintOne';
		case 2: return 'cell hintTwo';
		case 3: return 'cell hintThree';
		case 4: return 'cell hintFour';
		case 5: return 'cell hintFive';
		case 6: return 'cell hintSix';
		case 7: return 'cell hintSeven';
		case 8: return 'cell hintEight';
		default: return 'cell';
	}
}

function isBomb(x, y) {
	gameOver = true;
	return (grid[x][y] === 'X');
}

function displayCell(x, y) {
	var zeroSegmentList = new Set();

	x = parseInt(x);
	y = parseInt(y);

	zeroSegmentList.add('#' + x + '-' + y);

	var numbers = [];
	var up, down, left, right;

	switch (grid[x][y]){
		case 0:
			// Find all the connected zero values
			zeroSegmentList.forEach((element) => {
				numbers = element.split('');

				x = parseInt(numbers[1]);
				y = parseInt(numbers[3]);

				for (var i = (x - 1); i < (x + 2); i++){
					if (i >= 0 && i < height){
						for (var j = (y - 1); j < (y + 2); j++){
							if (j >= 0 && j < width){
								up = (i === (x-1)) && (j === y);
								down = (i === (x+1)) && (j === y);
								left = (i === x) && (j === (y-1));
								right = (i === x) && (j === (y+1));
									if (grid[i][j] === 0 && (up || down || left || right)){
										zeroSegmentList.add('#' + i + '-' + j);
										cellValue.add('#' + i + '-' + j);
									}
							}
						}
					}
				}
			});

			// Sort the zero coordinates and open the numerical cells around them
			myArray = Array.from(zeroSegmentList).sort();

			for (var i = 0; i < myArray.length; i++){
				numbers = myArray[i].split('');

				x = parseInt(numbers[1]);
				y = parseInt(numbers[3]);

				cellValue.add('#' + x + '-' + y);
			}
			break;

		case 'X':
			cellValue.add('#' + x + '-' + y);
			gameOver = true;
			break;

		default:
			cellValue.add('#' + x + '-' + y);
			break;
	}
}

function changeCellState(x, y) {
}