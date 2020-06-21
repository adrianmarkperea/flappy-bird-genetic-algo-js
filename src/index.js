import { createCanvas } from "./modules/canvas";
import Player from "./modules/player";
import { createMatrixChromosome } from "./modules/chromosomes";
import FlappyBird from "./modules/simulation";
import { WIDTH, HEIGHT } from "./globals";

let ctx;

function setup() {
  const canvas = createCanvas(document.getElementById("root"), WIDTH, HEIGHT);
  ctx = canvas.ctx;

  const individual = new Player();
  individual.addChromosome(createMatrixChromosome(5, 3));
  individual.addChromosome(createMatrixChromosome(3, 1));

  const simulationConfig = {
    prototype: individual,
    popSize: 10,
    onUpdate(state) {
      render(state);
    },
  };

  const simulation = new FlappyBird(simulationConfig);
  simulation.start();
}

function render({ population, columnManager }) {
  ctx.fillStyle = "#ddf3f5";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  columnManager.render(ctx);
  population.forEach((player) => player.render(ctx));
}

setup();
