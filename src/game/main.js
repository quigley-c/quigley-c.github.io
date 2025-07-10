import {screen} from './render.js';
import {world} from './world.js';

var w = new world();
var sc = new screen();

function startGame() {
  var interval = setInterval(update, 16.66);
}

function update() {
  sc.clear(sc.context);
  w.update(sc.context);
}

startGame();
