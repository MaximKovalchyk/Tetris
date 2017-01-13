AsyncCycle = function(fn, time) {
  this.fn = fn;
  this.time = time;
};

AsyncCycle.prototype.start = function() {
  this.fn();
  this.id = setTimeout(this.start.bind(this), this.time);
};

AsyncCycle.prototype.stop = function() {
  clearTimeout(this.id);
};
