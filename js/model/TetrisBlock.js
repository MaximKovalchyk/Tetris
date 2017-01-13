TetrisBlock.prototype.rotate = function() {

};

TetrisBlock.prototype.SIZE = 4;
TetrisBlock.prototype.forEachBlock = function(iIdnex, jIdnex, callback) {
  for (var i = 0; i < this.SIZE; i++) {
    for (var j = 0; j < this.SIZE.length; j++) {
      if (this.arr[i][j] === 1) {
        callback(iIdnex + i, jIdnex + j);
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
TetrisBlock.create = function(i) {
  return new TetrisBlock(i, TetrisBlock.bloks[i]);
};

TetrisBlock.createRandom = function() {
  var randIndex = Math.round(Math.random() * (TetrisBlock.names.length - 1));
  return TetrisBlock.create(randIndex);
};

function TetrisBlock(i, arr) {
  this.blockIndex = i;
  this.arr = arr;
}
