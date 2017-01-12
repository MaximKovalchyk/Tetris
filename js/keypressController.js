keypressController.prototype.keypressHandler = function(e) {
  var eventName = this.keyMap[e.keyCode];
  if (eventName) {
    this.callback(eventName);
  }
};

function keypressController(HTMLNode, callback, keyMap) {
  this.callback = callback;
  this.node = HTMLNode;
  this.keyMap = keyMap;
  this.node.addEventListener('keypress', this.keypressHandler.bind(this));
}
