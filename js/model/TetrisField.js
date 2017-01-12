TetrisField.prototype.FREE_CELL = 0;
TetrisField.prototype.BLOCK_CELL = 1;

TetrisField.prototype.generateField = function() {
  var i, j, res = [];
  for (i = 0; i < this.height; i++) {
    res.push([]);
    for (j = 0; j < this.width; j++) {
      res[i][j] = this.FREE_CELL;
    }
  }
  return res;
};

TetrisField.prototype.posNotInField = function(i, j) {
  return (i >= this.width || i < 0 || j >= this.height || j < 0);
};

TetrisField.prototype.getCellValue = function(i, j) {
  if (this.posNotInField(i, j)) {
    return this.BLOCK_CELL;
  }
  return this.field[i][j];
};

TetrisField.prototype.setCellValue = function(i, j, val) {
  this.field[i][j] = val;
};

function TetrisField(width, height) {
  this.width = width;
  this.height = height;
  this.field = this.generateField();
}
