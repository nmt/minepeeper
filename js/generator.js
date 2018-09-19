$(document).ready(main);

var debug = true;
var gameOver = false;

var width = 8,
	height = 10,
	bombCount = 8,
	bombList = new Set(),
	flagCount = bombCount,
	bombsFlagged = new Set();

var grid = [];
var cellValue = new Set();

$('.mr-face').text('\:\)');

function main() {
	generateGrid();
	placeBombs();
	printGrid();
	eventListeners();
}

function eventListeners() {
	$('.reset-button').click(function() {
		reset();
	});

	// Left click
	$('.cell').click(function() {
		if ($('#' + this.id).attr('data-flagged') == 'true') {
			// do nothing
		}
		else {
			openCell(this.id);
			flagLonelyBombs();
		}
	});

	// Right click
	$('.cell').on('contextmenu', function() {
		var cellClasses = $(this).attr('class');

		// If cell isn't already open, open
		if (!cellClasses.includes('open')) {
			flag(this.id);
		}
	});
}

function reset() {
	gameOver = false;
	bombList = new Set();
	flagCount = bombCount;
	bombsFlagged = new Set();
	cellValue = new Set();
	grid = [];
	generateGrid();
	resetGrid();
	placeBombs();
	reprintGrid();
}

function resetGrid() {
	var cells = $('.cell');
	for (var i = 0; i < cells.length; i++) {
		$(cells[i]).attr('class', 'cell');
		$(cells[i]).text('0');
		$(cells[i]).attr('data-value', 0);
		$(cells[i]).attr('data-flagged', false);
	}
}

function reprintGrid() {
	var cells = $('.cell');
	var boop = 0;

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			if (debug == true) {
				$(cells[boop]).text(grid[i][j]);
			}
			else {
				$(cells[boop]).text('\\');
			}
			$(cells[boop]).attr('data-value', grid[i][j]);
			boop++;
		}
	}
}

/**
 * Generates the N by M grid specified by width and height parameters.
 */
function generateGrid() {
	for (var i = 0; i < height; i++) {
		var row = [];
		for (var j = 0; j < width; j++) {
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

	for (var i = 0; i < bombCount; i++) {
		x = Math.floor(Math.random() * height);
		y = Math.floor(Math.random() * width);

		// Only place a bomb if the area is clear!
		if (!isBomb(x,y)) {
			bombList.add(x + ' ' + y);
			grid[x][y] = 'X';
			generateHints(x,y);
		}
		else {
			i--;
		}
	}

	$('.bomb-count').text(flagCount);
	$('.bombs-flagged-DEBUG').text(bombsFlagged.size);
}

function displayBombs() {
	bombList.forEach(element => {
		var params = element.split('');
		x = parseInt(params[0]);
		y = parseInt(params[2]);
		cellValue.add('#' + x + '-' + y);
	});
}

/**
 * Adds hint numbers for each cell surround a bomb
 */
function generateHints(x, y) {
	// Left to right of the bomb
	for (var i = (x - 1); i < (x + 2); i++) {
		// Don't go beyond the sides of the grid!
		if (i >= 0 && i < height) {
			// Top to bottom of bomb
			for (var j = (y - 1); j < (y + 2); j++) {
				if (j >= 0 && j < width) {
					if (!isBomb(i,j)) {
						grid[i][j] += 1;
					}
				}
			}
		}
	}
}

function printGrid() {
	var print = '';

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
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

function openCell(currentId) {
	if (!gameOver) { 
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

		$('.grid').on('mousedown', function() {
			$('.mr-face').text('\:O');
		});
		$('.grid').on('mouseup', function() {
			if (grid[x][y] !== 'X') {
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
 * @param {*} cell	Cell of interest
 * @returns			Class name to colour a cell
 */
function determineColour(cell) {
	switch (cell) {
		case 0: return 'cell open hintZero';
		case 1: return 'cell open hintOne';
		case 2: return 'cell open hintTwo';
		case 3: return 'cell open hintThree';
		case 4: return 'cell open hintFour';
		case 5: return 'cell open hintFive';
		case 6: return 'cell open hintSix';
		case 7: return 'cell open hintSeven';
		case 8: return 'cell open hintEight';
		default: return 'cell open';
	}
}

function isBomb(x, y) {
	return (grid[x][y] === 'X');
}

function displayCell(x, y) {
	x = parseInt(x);
	y = parseInt(y);
	cellValue.add('#' + x + '-' + y);

	switch (grid[x][y]) {
		case 0:
			var zeroSegmentList = new Set();
			var openedCells = new Set();
			zeroSegmentList.add('#' + x + '-' + y);

			var up, down, left, right;

			// Find all the connected zero values
			zeroSegmentList.forEach((element) => {
				var numbers = element.split('');
				x = parseInt(numbers[1]);
				y = parseInt(numbers[3]);

				for (var i = (x - 1); i < (x + 2); i++) {
					if (i >= 0 && i < height) {
						for (var j = (y - 1); j < (y + 2); j++) {
							if (j >= 0 && j < width) {
								// U D L R are true if there are more 0 cells to be added to the lit
								up = (i === (x-1)) && (j === y);
								down = (i === (x+1)) && (j === y);
								left = (i === x) && (j === (y-1));
								right = (i === x) && (j === (y+1));
								if (grid[i][j] === 0 && (up || down || left || right)) {
									zeroSegmentList.add('#' + i + '-' + j);
									openedCells.add('#' + i + '-' + j);
								}
								else if (grid[i][j] != 0) {
									openedCells.add('#' + i + '-' + j);
								}
							}
						}
					}
				}
			});

			openedCells.forEach((element) => {
				var numbers = element.split('');
				x = parseInt(numbers[1]);
				y = parseInt(numbers[3]);
				var cell = $('#' + x + '-' + y);

				if (!(cell.attr('data-flagged') == 'true')) {
					cellValue.add('#' + x + '-' + y);
				}
			});
			break;

		case 'X':
			gameOver = true;
			displayBombs();
			break;

		default:
			break;
	}
}

function flag(currentId) {
	var params = currentId.split('-');
	var x = parseInt(params[0]);
	var y = parseInt(params[1]);

	var $cell = $('#' + x + "-" + y);

	// Toggle flag on cell
	if ($cell.attr('data-flagged') == 'true') {
		$cell.attr('data-flagged', false);
		$cell.text('\\');
		flagCount++;

		if (isBomb(x,y) == true) {
			bombsFlagged.delete(currentId);
		}
	}
	else {
		$cell.attr('data-flagged', true);
		$cell.text('>');
		flagCount--;

		if (isBomb(x,y) == true) {
			bombsFlagged.add(currentId);
		}
	}
	$('.bomb-count').text(flagCount);
	$('.bombs-flagged-DEBUG').text(bombsFlagged.size);
}

function flagLonelyBombs() {
	var params, x, y;
	var $cell, cellClasses;

	bombList.forEach(element => {
		console.log({element});
		params = element.split('');
		x = parseInt(params[0]);
		y = parseInt(params[2]);

		isValid = false;

		// Check the surrounding cells
		for (var i = (x - 1); i < (x + 2); i++) {
			if (i >= 0 && i < height) {
				for (var j = (y - 1); j < (y + 2); j++) {
					if (j >= 0 && j < width) {
						$cell = $('#' + i + '-' + j);

						cellClasses = $cell.attr('class');
						isValid = isBomb(i,j) || cellClasses.includes('open')
					}
				}
			}
		}
		if (isValid) {
			bombsFlagged.add(x + '-' + y);
			$('.bombs-flagged-DEBUG').text(bombsFlagged.size);
		}
	});
}