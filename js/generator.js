$(document).ready(generateGrid);

var width = 8;
var height = 10;

/**
 * Generates the N by M grid specified by width and height parameters.
 */
function generateGrid() {
    var row = [];
    var grid = [];

    for (var i = 0; i < width; i++){
        row.push('X');
    }
    for (var i = 0; i < height; i++){
        grid.push(row);
    }
}
