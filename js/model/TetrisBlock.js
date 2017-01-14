TetrisBlock.prototype.removeTopLine = function() {
  var line = this.arr.shift();
  this.arr.push(line);
};

TetrisBlock.prototype.removeLeftColumn = function() {
  for (var i = 0, val; i < this.SIZE; i++) {
    val = this.arr[i].shift();
    this.arr[i].push(val);
  }
};

TetrisBlock.prototype.isFreeFirstLine = function() {
  var i, res = 0;
  for (i = 0; i < this.SIZE; i++) {
    res += this.arr[0][i];
  }
  return !res;
};

TetrisBlock.prototype.isFreeFirstColumn = function() {
  var i, res = 0;
  for (i = 0; i < this.SIZE; i++) {
    res += this.arr[i][0];
  }
  return !res;
};

TetrisBlock.prototype.turn = function() {
  var i, j, res = [];
  for (i = 0; i < this.SIZE; i++) {
    res.push([]);
    for (j = 0; j < this.SIZE; j++) {
      res[i][j] = this.arr[this.SIZE - j - 1][i];
    }
  }
  res = new TetrisBlock(this.i, this.pos, res);
  //remove free lines
  while (res.isFreeFirstLine()) {
    res.removeTopLine();
  }
  while (res.isFreeFirstColumn()) {
    res.removeLeftColumn();
  }

  return res;
};

TetrisBlock.prototype.right = function() {
  return new TetrisBlock(this.i, {
    x: this.pos.x + 1,
    y: this.pos.y
  }, this.arr);
};

TetrisBlock.prototype.left = function() {
  return new TetrisBlock(this.i, {
    x: this.pos.x - 1,
    y: this.pos.y
  }, this.arr);
};

TetrisBlock.prototype.down = function() {
  return new TetrisBlock(this.i, {
    x: this.pos.x,
    y: this.pos.y + 1
  }, this.arr);
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
