$(document).ready(generateGrid);

var width = 8;
var height = 10;

var grid = [];

/**
 * Generates the N by M grid specified by width and height parameters.
 */
function generateGrid() {
    var row = [];
    var printableRow = '';
    var printableGrid = '';

    for (var i = 0; i < width; i++){
        row.push('☐');
        printableRow += '☐ ';
    }
    for (var i = 0; i < height; i++){
        grid.push(row);
        // printableGrid += printableRow + '<br>';
    }

    $('.grid').text(printableGrid);
}
