$(document).ready(main);

var debug = false;
var gameOver = false;

var width = 8,
	height = 10,
	bombCount = 8,
	bombList = new Set(),
	flagsLeft = bombCount,
	bombsFlagged = new Set();

var grid = [];
var cellValue = new Set();

const SETTINGS = {
	CLASSES: {
		MR_FACE: $('.mr-face')
	},
	ELEMENTS: {
		SMILE: ':)',
		SURPRISE: ':O',
		WIN: 'B)',
		DEAD: 'X(',
		EMPTY: ' ',
		ONE: '1',
		TWO: '2',
		THREE: '3',
		FOUR: '4',
		FIVE: '5',
		SIX: '6',
		SEVEN: '7',
		EIGHT: '8',
		UNOPENED: '\\',
		FLAGGED: '>'
	},
	ELEMENTS_EMOJI: {
		SMILE: '😊',
		SURPRISE: '😮',
		WIN: '😎',
		DEAD: '😵'
	}
};

function main() {
	// SETTINGS.ELEMENTS = SETTINGS.ELEMENTS_EMOJI;
	generateGrid();
	placeBombs();
	printGrid();
	eventListeners();
	SETTINGS.CLASSES.MR_FACE.text(SETTINGS.ELEMENTS.SMILE);
}

function eventListeners() {
	$('.cell').on('mousedown', function(event) {
		if (!gameOver) {
			var cellClasses = $(this).attr('class');

			// Left click
			if (event.which == 1) {
				if (!cellClasses.includes('open')) {
					SETTINGS.CLASSES.MR_FACE.text(SETTINGS.ELEMENTS.SURPRISE);
				}
			}
			// Right click
			else if (event.which == 3) {
				// If cell isn't already open, open
				if (!cellClasses.includes('open')) {
					flag('#' + this.id);
				}
			}
		}
	});

	$('.cell').on('mouseup', function(event) {
		// Mouseup only reacts to left clicks
		if (!gameOver && event.which == 1) {
			if ($('#' + this.id).attr('data-flagged') == 'true') {
				// Do nothing
			}
			else {
				openCell(this.id);

				var params = this.id.split('');
				x = parseInt(params[0]);
				y = parseInt(params[2]);
				if (!isBomb(x,y)) {
					SETTINGS.CLASSES.MR_FACE.text(SETTINGS.ELEMENTS.SMILE);
				}
				else {
					SETTINGS.CLASSES.MR_FACE.text(SETTINGS.ELEMENTS.DEAD);
				}
			}
		}
		flagLonelyBombs();
		checkIfWinrar();
	});

	$('.reset-button').click(function() {
		reset();
	});
}

function reset() {
	gameOver = false;
	bombList = new Set();
	flagsLeft = bombCount;
	bombsFlagged = new Set();
	cellValue = new Set();
	grid = [];
	SETTINGS.CLASSES.MR_FACE.text(SETTINGS.ELEMENTS.SMILE);
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
	var counter = 0;

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			if (debug == true) {
				$(cells[counter]).text(grid[i][j]);
			}
			else {
				$(cells[counter]).text(SETTINGS.ELEMENTS.UNOPENED);
			}
			$(cells[counter]).attr('data-value', grid[i][j]);
			counter++;
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
			bombList.add('#' + x + ' ' + y);
			grid[x][y] = 'X';
			generateHints(x,y);
		}
		else {
			i--;
		}
	}

	$('.bomb-count').text(flagsLeft);
}

function displayBombs() {
	bombList.forEach(element => {
		x = coordinatesFromId(element)[0];
		y = coordinatesFromId(element)[1];
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
	// maybe just get the data attribute of the cell
	var params = currentId.split('-');
	displayCell(params[0], params[1]);
	var x = parseInt(params[0]);
	var y = parseInt(params[1]);

	cellValue.forEach(element => {
		x = coordinatesFromId(element)[0];
		y = coordinatesFromId(element)[1];

		$(element).html(grid[x][y]);
		$(element).attr({'class':determineColour($(element).attr('data-value'))});
	});
	cellValue.clear();
}

/**
 * @param {*} cell	Cell of interest
 * @returns			Class name to colour a cell
 */
function determineColour(cell) {
	switch (cell) {
		case '0': return 'cell open hintZero';
		case '1': return 'cell open hintOne';
		case '2': return 'cell open hintTwo';
		case '3': return 'cell open hintThree';
		case '4': return 'cell open hintFour';
		case '5': return 'cell open hintFive';
		case '6': return 'cell open hintSix';
		case '7': return 'cell open hintSeven';
		case '8': return 'cell open hintEight';
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
				x = coordinatesFromId(element)[0];
				y = coordinatesFromId(element)[1];

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
				x = coordinatesFromId(element)[0];
				y = coordinatesFromId(element)[1];
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

function coordinatesFromId(id) {
	var coordinates = [],
		numbers = id.split('');
	coordinates[0] = parseInt(numbers[1]);
	coordinates[1] = parseInt(numbers[3]);
	return coordinates;
}

function flag(currentId) {
	x = coordinatesFromId(currentId)[0];
	y = coordinatesFromId(currentId)[1];

	var $cell = $('#' + x + "-" + y);

	// Toggle flag on cell
	if ($cell.attr('data-flagged') == 'true') {
		$cell.attr('data-flagged', false);
		$cell.text(SETTINGS.ELEMENTS.UNOPENED);
		flagsLeft++;

		if (isBomb(x,y) == true) {
			bombsFlagged.delete(currentId);
		}
	}
	else {
		$cell.attr('data-flagged', true);
		$cell.text(SETTINGS.ELEMENTS.FLAGGED);
		flagsLeft--;

		if (isBomb(x,y) == true) {
			bombsFlagged.add(currentId);
		}
	}
	$('.bomb-count').text(flagsLeft);
}

function flagLonelyBombs() {
	var x, y;
	var $cell, cellClasses;

	bombList.forEach(element => {
		x = coordinatesFromId(element)[0];
		y = coordinatesFromId(element)[1];

		var isValid = true;

		// Check the surrounding cells
		for (var i = (x - 1); i < (x + 2); i++) {
			if (i >= 0 && i < height) {
				for (var j = (y - 1); j < (y + 2); j++) {
					if (j >= 0 && j < width) {
						$cell = $('#' + i + '-' + j);

						cellClasses = $cell.attr('class');
						isValid = isValid && (isBomb(i,j) || cellClasses.includes('open'));
					}
				}
			}
		}
		if (isValid) {
			bombsFlagged.add('#' + x + '-' + y);
		}
	});
}

function checkIfWinrar() {
	if (bombsFlagged.size == bombCount) {
		gameOver = true;
		SETTINGS.CLASSES.MR_FACE.text(SETTINGS.ELEMENTS.WIN);
		console.log('congration your are an winrar');
	}
}