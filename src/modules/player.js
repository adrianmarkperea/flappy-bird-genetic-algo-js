import { Individual } from "@adrianperea/genie.js";
import { HEIGHT, GRAVITY } from "../globals";

class Player extends Individual {
  constructor() {
    super();

    this.x = 50;
    this.y = HEIGHT / 2;
    this.size = 40;
    this.velocity = 0;

    this.score = 0;

    this.isDead = false;
  }

  fromTheLikenessOf() {
    const likeness = new Player();
    this.dna.forEach((chromosome) => {
      likeness.addChromosome(chromosome.createRandomCopy());
    });

    likeness.fitness = 0;

    return likeness;
  }

  ascend() {
    this.velocity = -8.0;
  }

  checkIsDead(columnPair) {
    if (this.y <= 0 || this.y + this.size >= HEIGHT || columnPair.hits(this)) {
      this.isDead = true;
    }
  }

  attemptScore(columnPair) {
    if (!columnPair.canScore(this)) return;

    this.score += 1;
  }

  update() {
    if (this.isDead) return;

    this.y += this.velocity;
    this.velocity += GRAVITY;

    if (this.y > HEIGHT - this.size) {
      this.y = HEIGHT - this.size;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
    }
  }

  render(ctx) {
    ctx.fillStyle = "#f2aaaa";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default Player;
