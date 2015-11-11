var options = [1, 2, 3, 4, 5, 6, 7, 8, 9]

var sudoku_grid = [
      [0,9,0,0,0,0,0,0,6],
      [0,0,0,9,6,0,4,8,5],
      [0,0,0,5,8,1,0,0,0],
      [0,0,4,0,0,0,0,0,0],
      [5,1,7,2,0,0,9,0,0],
      [6,0,2,0,0,0,3,7,0],
      [1,0,0,8,0,4,0,2,0],
      [7,0,6,0,0,0,8,1,0],
      [3,0,0,0,9,0,0,0,0]
    ];

function solveSudoku(sudoku_columns) {
  var firstSlot = nextEmptySlot(sudoku_columns);
  if (firstSlot == -1) {
    // console.log(sudoku_columns);
    return sudoku_columns;
  }

  var i = firstSlot[0];
  var j = firstSlot[1];

  var possible_elems = getPossibleElementsToTry(sudoku_columns, i, j);
  if (possible_elems.length == 0) {
    return false;
  }

  for (var k = 0; k < possible_elems.length; ++k) {
    var num_to_try = possible_elems[k];
    sudoku_columns[i][j] = num_to_try;
    var result = solveSudoku(sudoku_columns);
    // sleepFor(5000);
    if (result != false) {
      break;
    } else {
      // backtrack
      sudoku_columns[i][j] = 0;
    }
  }

  if (result) {
    return sudoku_columns;
  }
  return false;
}

function nextEmptySlot(sudoku_columns) {
  for (var i = 0; i < 9; ++i) {
    for (var j = 0; j < 9; ++j) {
      if (sudoku_columns[i][j] == 0) {
        return [i, j];
      }
    }
  }
  return -1;
}

// Can directly create a possible elements set instead of creating 3 different lists 
function getPossibleElementsToTry(sudoku_columns, i, j) {
  // check column i
  var column_elems = [];
  for (var k = 0; k < 9; ++k) {
    if (sudoku_columns[i][k] != 0) {
      column_elems.push(sudoku_columns[i][k]);
    }
  }

  // check row j
  var row_elems = [];
  for (var k = 0; k < 9; ++k) {
    if (sudoku_columns[k][j] != 0) {
      row_elems.push(sudoku_columns[k][j]);
    }
  }

  // check box enclosed
  var box_elems = [];
  var box_origin = getBoxOrigin(i, j);
  origin_x = box_origin[0];
  origin_y = box_origin[1];
  for (var a = 0; a < 3; ++a) {
    for (var b = 0; b < 3; ++b) {
      if (sudoku_columns[origin_x + a][origin_y + b] != 0) {
        box_elems.push(sudoku_columns[origin_x + a][origin_y + b]);
      }
    }
  }

  var possible_elems = [];
  for (var k = 1; k <= 9; ++k) {
    if (column_elems.indexOf(k) == -1 && row_elems.indexOf(k) == -1 && box_elems.indexOf(k) == -1) {
      possible_elems.push(k);
    }
  }
  return possible_elems;
}

function getBoxOrigin(i, j) {
  var x = 3 * Math.floor(i / 3);
  var y = 3 * Math.floor(j / 3);
  return [x, y];
}

function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){;} 
}

solveSudoku(sudoku_grid);
console.log(sudoku_grid);








