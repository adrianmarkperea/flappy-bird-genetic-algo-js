import { createCanvas } from "./modules/canvas";
import Player from "./modules/player";
import { WIDTH, HEIGHT } from "./globals";

let ctx;
let player;

function setup() {
  const canvas = createCanvas(document.getElementById("root"), WIDTH, HEIGHT);
  ctx = canvas.ctx;

  player = new Player();

  document.addEventListener("keypress", handleKeyPresses);
}

function loop() {
  ctx.fillStyle = "#ddf3f5";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  player.update();
  player.render(ctx);

  requestAnimationFrame(loop);
}

function handleKeyPresses(e) {
  if (e.code === "Space") {
    player.ascend();
  }
}

setup();
loop();
