TetrisModel.prototype.userInput = function(arg) {
  console.log(arg);
};

TetrisModel.prototype.print = function() {
  var i, j, objName;
  for (i = 0; i < this.field.height; i++) {
    for (j = 0; j < this.field.width; j++) {
      objName = this.field.getCellValue(i, j) ? 'block' : 'none';
      this.view.printObjects(objName, this.view.createPoint(i, j));
    }
  }
};

function TetrisModel(args) {
  this.view = args.view;
  this.field = new TetrisField(args.width, args.height);
  this.field.setCellValue(2, 5, this.field.BLOCK_CELL);
  this.print();
}
