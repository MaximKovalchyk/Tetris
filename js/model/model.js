TetrisModel.prototype.moveBlock = function(moveName) {
  if (this.tetrisBlock) {
    oldBlock = this.tetrisBlock;
    newBlock = this.tetrisBlock[moveName]();

    this.field.removeBlock(oldBlock);
    if (this.field.canPlaceBlock(newBlock)) {
      this.tetrisBlock = newBlock;
      this.field.placeBlock(newBlock);
      this.print();
      return true;
    }
    this.field.placeBlock(this.tetrisBlock);
  }
  return false;
};

TetrisModel.prototype.print = function() {
  var i, j, objName;
  for (i = 0; i < this.field.width; i++) {
    for (j = 0; j < this.field.height; j++) {
      objName = this.field.getCellValue(i, j) ? 'block' : 'none';
      this.view.printObjects(objName, this.view.createPoint(i, j));
    }
  }
};

TetrisModel.prototype.startCicle = function(fn) {
  return new AsyncCycle(fn, 1000 / this.SPEED);
};

TetrisModel.prototype.gameMove = function() {
  var tetrisBlock, score;
  if (this.tetrisBlock) {
    //if can move block - move
    //else add tetrisBlock on next move
    if (!this.moveBlock('down')) {
      score = this.field.burnLines(this.tetrisBlock);
      this.updateScore(score);
      this.tetrisBlock = null;
    }
  } else {
    //if game field can place block - create
    tetrisBlock = TetrisBlock.createRandom({
      x: Math.floor(this.field.width / 2),
      y: 0
    });
    if (this.field.canPlaceBlock(tetrisBlock)) {
      this.tetrisBlock = tetrisBlock;
      this.field.placeBlock(this.tetrisBlock);
    } else {
      this.gameOver();
    }
  }
  this.print();
};

TetrisModel.prototype.updateScore = function(scoreDif) {
  if (scoreDif > 0) {
    this.score += scoreDif;
    this.view.printScore(this.score);
    this.SPEED = Math.floor(this.score / 5) + 1;
    this.gameMoveCycle.time = 1000 / this.SPEED;
  }
};

TetrisModel.prototype.gameOver = function() {
  this.view.youLose(this.score);
  this.gameMoveCycle.stop();
};

function TetrisModel(args) {
  this.view = args.view;
  this.SPEED = args.SPEED || 1;
  this.tetrisBlock = null;
  this.score = 0;
  this.field = new TetrisField(args.width, args.height);
  this.gameMoveCycle = this.startCicle(this.gameMove.bind(this));
  this.gameMoveCycle.start();
  this.view.printScore(this.score);
}
