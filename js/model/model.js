TetrisModel.prototype.userInput = function(arg) {
  console.log(arg);
  this.moveBlock(arg);
};

TetrisModel.prototype.moveBlock = function(moveName) {
  if (this.tetrisBlock) {
    oldBlock = this.tetrisBlock;
    newBlock = this.tetrisBlock[moveName]();

    this.field.removeBlock(oldBlock);
    if (this.field.canPlaceBlock(newBlock)) {
      this.tetrisBlock = newBlock;
      this.field.placeBlock(newBlock);
      this.print();
    }
    this.field.placeBlock(this.tetrisBlock);
  }
};

TetrisModel.prototype.print = function() {
  var i, j, objName;
  for (i = 0; i < this.field.width; i++) {
    for (j = 0; j < this.field.height; j++) {
      objName = this.field.getCellValue(i, j) ? 'block' : 'none';
      this.view.printObjects(objName, this.view.createPoint(i, j));
    }
  }
  console.log('score: ' + this.score);
};

TetrisModel.prototype.startCicle = function(fn, framePerSeconds) {
  var timerTime = 1000 / framePerSeconds;
  return new AsyncCycle(fn, timerTime);
};

TetrisModel.prototype.gameMove = function() {
  var tetrisBlock, oldPos, newPos;
  if (this.tetrisBlock) {
    //if can move block - move
    //else add tetrisBlock on next move
    oldPos = this.tetrisBlock.pos;
    newPos = {
      x: oldPos.x,
      y: oldPos.y + 1
    };
    this.field.removeBlock(this.tetrisBlock);
    this.tetrisBlock.pos = newPos;
    if (this.field.canPlaceBlock(this.tetrisBlock)) {
      this.field.placeBlock(this.tetrisBlock);
    } else {
      this.tetrisBlock.pos = oldPos;
      this.field.placeBlock(this.tetrisBlock);
      //check score upgrade
      this.score += this.field.burnLines(this.tetrisBlock);
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

function TetrisModel(args) {
  this.view = args.view;
  this.SPEED = args.SPEED || 2;
  this.tetrisBlock = null;
  this.score = 0;
  this.field = new TetrisField(args.width, args.height);
  this.gameMoveCycle = this.startCicle(this.gameMove.bind(this), this.SPEED);
  this.gameMoveCycle.start();
}
