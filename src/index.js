import { createCanvas } from "./modules/canvas";
import Player from "./modules/player";
import ColumnPair from "./modules/column-pair";
import { WIDTH, HEIGHT } from "./globals";

let ctx;
let player;
let columns = [];

function setup() {
  const canvas = createCanvas(document.getElementById("root"), WIDTH, HEIGHT);
  ctx = canvas.ctx;

  player = new Player();
  columns.push(new ColumnPair(300));

  document.addEventListener("keypress", handleKeyPresses);
}

function loop() {
  ctx.fillStyle = "#ddf3f5";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  player.update();
  columns.forEach((c) => c.update());

  player.render(ctx);
  columns.forEach((c) => c.render(ctx));

  requestAnimationFrame(loop);
}

function handleKeyPresses(e) {
  if (e.code === "Space") {
    player.ascend();
  }
}

setup();
loop();
