import { createCanvas } from "./modules/canvas";
import Player from "./modules/player";
import { WIDTH, HEIGHT } from "./globals";
import ColumnManager from "./modules/column-manager";

let ctx;
let player;
let columnManager;

function setup() {
  const canvas = createCanvas(document.getElementById("root"), WIDTH, HEIGHT);
  ctx = canvas.ctx;

  player = new Player();
  columnManager = new ColumnManager();

  document.addEventListener("keypress", handleKeyPresses);
}

function loop() {
  ctx.fillStyle = "#ddf3f5";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  player.update();
  columnManager.update();

  player.render(ctx);
  columnManager.render(ctx);

  requestAnimationFrame(loop);
}

function handleKeyPresses(e) {
  if (e.code === "Space") {
    player.ascend();
  }
}

setup();
loop();
