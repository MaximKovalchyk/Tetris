window.addEventListener('load', function load(ev) {
  window.removeEventListener('load', load);

  var body = document.body;
  var scoreDiv = document.createElement('div');
  body.appendChild(scoreDiv);

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

  view.printScore = function(score) {
    scoreDiv.innerText = 'Score: ' + score;
  };

  view.youLose = function(score) {
    function youLose() {
      window.alert("YOU LOSE! Score: " + score);
    }
    window.setTimeout(youLose, 0);
  };

  var model = new TetrisModel({
    width: 15,
    height: 20,
    view: view
  });

  var controller = new keypressController(body, model.dispatch.bind(model), {
    97: 'left',
    100: 'right',
    115: 'down',
    32: 'turn',
    116: 'turn',
    112: 'pause'
  });
});
