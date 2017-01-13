TetrisField.prototype.FREE_CELL = 0;
TetrisField.prototype.BLOCK_CELL = 1;

TetrisField.prototype.generateField = function() {
  var i, j, res = [];
  for (i = 0; i < this.width; i++) {
    res.push([]);
    for (j = 0; j < this.height; j++) {
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

TetrisField.prototype.canPlaceBlock = function(tetrisBlock) {
  var canPlace, self = this;
  tetrisBlock.forEachWhileBlock(function(i, j) {
    //block of tetrisBlock not on another block
    canPlace = !self.getCellValue(i, j);
    return canPlace;
  });
  return canPlace;
};

TetrisField.prototype.removeBlock = function(tetrisBlock) {
  this.setBlockVal(tetrisBlock, 0);
};

TetrisField.prototype.placeBlock = function(tetrisBlock) {
  this.setBlockVal(tetrisBlock, 1);
};

TetrisField.prototype.setBlockVal = function(tetrisBlock, val) {
  var self = this;
  tetrisBlock.forEachWhileBlock(function(i, j) {
    self.setCellValue(i, j, val);
    return true;
  });
};

function TetrisField(width, height) {
  this.width = width;
  this.height = height;
  this.field = this.generateField();
}
