TetrisField.prototype.FREE_CELL = 0;
TetrisField.prototype.BLOCK_CELL = 1;

TetrisField.prototype.isItFullLine = function(y) {
  for (var x = 0; x < this.width; x++) {
    if (!this.getCellValue(x, y)) {
      return false;
    }
  }
  return true;
};

TetrisField.prototype.delLine = function(y) {
  for (var x = 0; x < this.width; x++) {
    this.field[x].splice(y, 1);
    this.field[x].unshift(0);
  }
};

TetrisField.prototype.burnLines = function(tetrisBlock) {
  var y = tetrisBlock.pos.y,
    len = tetrisBlock.pos.y + tetrisBlock.SIZE,
    count = 0;
  for (; y < len && y < this.height; y++) {
    if (this.isItFullLine(y)) {
      this.delLine(y);
      count++;
    }
  }
  return count;
};

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
