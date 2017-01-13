Print2D.prototype.createPoint = function(x, y) {
  return {
    x: Math.round(x),
    y: Math.round(y),
  };
};

Print2D.prototype.printBlock = function(color, point, blockSize) {
  this.ctx.fillStyle = color;
  blockSize = blockSize || this.BOX_SIZE;
  this.ctx.fillRect(point.x, point.y, blockSize, blockSize);
};

Print2D.prototype.clear = function() {
  this.printBlock(this.backgroundColor, this.createPoint(0, 0), Math.max(this.WIDTH, this.HEIGHT));
};

Print2D.prototype.convertPointToPixels = function(point) {
  return this.createPoint(point.x * this.BOX_SIZE, point.y * this.BOX_SIZE);
};

Print2D.prototype.createCanvas = function() {
  this.canvas = document.createElement('canvas');
  this.canvas.width = this.WIDTH;
  this.canvas.height = this.HEIGHT;
  this.ctx = this.canvas.getContext("2d");
  this.clear();
  this.parentHTMLNode.appendChild(this.canvas);
};

Print2D.prototype.printObjects = function(name, point) {
  point = this.convertPointToPixels(point);
  this.printBlock(this.objects[name].color, point);
};

Print2D.prototype.youLose = function() {
  function youLose() {
    window.alert("YOU LOSE!!!!!!!!");
  }
  window.setTimeout(youLose, 0);
};

Print2D.prototype.defSettings = {
  BOX_SIZE: 16,
  WIDTH: 640,
  HEIGHT: 480,
  backgroundColor: '#eee',
  objects: {
    'wall': {
      color: '#bbb'
    },
    'none': {
      color: '#eee'
    },
  },
};

Print2D.prototype.setProperties = function(propNames, settings) {
  var self = this;
  propNames.forEach(function(propName) {
    self[propName] = settings[propName] || self.defSettings[propName];
  });
};

function Print2D(ParentHTMLNode, settings) {
  settings = settings || {};
  this.setProperties([
    'BOX_SIZE',
    'WIDTH',
    'HEIGHT',
    'objects',
    'backgroundColor'], settings);

  this.parentHTMLNode = ParentHTMLNode;
  this.createCanvas();
}
