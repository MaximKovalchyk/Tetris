AsyncCycle = function(fn, time) {
  this.go = false;
  this.fn = fn;
  this.time = time;
};

AsyncCycle.prototype._iteration = function() {
  this.fn();
  if (this.go) {
    this.id = setTimeout(this._iteration.bind(this), this.time);
  }
};

AsyncCycle.prototype.start = function() {
  this.go = true;
  this._iteration();
};

AsyncCycle.prototype.stop = function() {
  this.go = false;
  clearTimeout(this.id);
};
