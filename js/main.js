window.addEventListener('load', function load(ev) {
  window.removeEventListener('load', load);

  var body = document.body;

  var view = new Print2D(body, {
    WIDTH: 300,
    HEIGHT: 400,
    BOX_SIZE: 20,
    backgroundColor: '#eee',
    objects: {
      'block': {
        color: 'black'
      },
      'none': {
        color: '#eee'
      },
    }
  });

  var model = new TetrisModel({
    width: 15,
    height: 20,
    view: view
  });

  var controller = new keypressController(body, model.userInput.bind(model), {
    97: 'left',
    100: 'right',
    115: 'speed',
    32: 'turn'
  });
});
