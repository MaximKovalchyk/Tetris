window.addEventListener('load', function load(ev) {
  window.removeEventListener('load', load);

  var body = document.body;

  view = new Print2D(body, {
    WIDTH: 640,
    HEIGHT: 480,
    BOX_SIZE: 16,
    backgroundColor: '#eee',
    colorMap: {
      'wall': '#bbb',
      'block': 'black',
      'none': '#eee',
    }
  });

  var model = new TetrisModel();

  controller = new keypressController(body, model.userInput.bind(model), {
    97: 'left',
    100: 'right',
    115: 'speed',
    32: 'turn'
  });
});
