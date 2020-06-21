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

  initData();

  document.addEventListener("keypress", handleKeyPresses);
}

function initData() {
  player = new Player();
  columnManager = new ColumnManager();
}

function loop() {
  if (!player.isDead) {
    ctx.fillStyle = "#ddf3f5";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    columnManager.update();
    columnManager.render(ctx);

    player.update();
    player.checkIsDead(columnManager);
    player.render(ctx);
  } else {
    initData();
  }

  requestAnimationFrame(loop);
}

function handleKeyPresses(e) {
  if (e.code === "Space") {
    player.ascend();
  }
}

setup();
loop();
