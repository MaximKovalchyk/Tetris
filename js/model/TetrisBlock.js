TetrisBlock.prototype.rotate = function() {

};

TetrisBlock.prototype.SIZE = 4;
TetrisBlock.prototype.forEachWhileBlock = function(callback) {
  var i, j, res;
  for (i = 0; i < this.SIZE; i++) {
    for (j = 0; j < this.SIZE; j++) {
      if (this.arr[i][j] === 1) {
        res = callback(this.pos.x + j, this.pos.y + i);
        if (!res) {
          return;
        }
      }
    }
  }
};

TetrisBlock.bloks = [
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
];

TetrisBlock.create = function(i, pos) {
  return new TetrisBlock(i, pos, TetrisBlock.bloks[i]);
};

TetrisBlock.createRandom = function(pos) {
  var randIndex = Math.round(Math.random() * (TetrisBlock.bloks.length - 1));
  return TetrisBlock.create(randIndex, pos);
};

function TetrisBlock(i, pos, arr) {
  this.blockIndex = i;
  this.arr = arr;
  this.pos = pos;
}
