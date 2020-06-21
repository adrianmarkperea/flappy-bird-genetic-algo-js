import { Individual } from "@adrianperea/genie.js";
import { matrix } from "mathjs";
import Brain from "./brain";
import { WIDTH, HEIGHT, GRAVITY } from "../globals";

class Player extends Individual {
  constructor(dna = []) {
    super(dna);

    this.x = 50;
    this.y = HEIGHT / 2;
    this.size = 40;
    this.velocity = 0;

    this.score = 0;

    this.isDead = false;

    if (this.dna.length !== 0) {
      this.stimuli = [];
      this._generateBrain();
    }
  }

  _generateBrain() {
    const weightsIH = this._resizeDna(this.getDna(0), 5, 3);
    const weightsHO = this._resizeDna(this.getDna(1), 3, 1);
    this.brain = new Brain(5, 3, 1, weightsIH, weightsHO);
    // this.brain = new Brain(5, 3, 1);
  }

  _resizeDna(dna, rows, columns) {
    const resized = Array(rows);
    for (let i = 0; i < rows; i++) {
      resized[i] = Array(columns);
      for (let j = 0; j < columns; j++) {
        resized[i][j] = dna[i][j];
      }
    }

    return resized;
  }

  fromTheLikenessOf() {
    const randomDna = this.dna.map((chromosome) =>
      chromosome.createRandomCopy()
    );

    const likeness = new Player(randomDna);

    likeness.fitness = 0;

    return likeness;
  }

  think(closestColumn) {
    this._calculateStimuli(closestColumn);
    const normalized = this._normalizeStimuli();
    const thoughts = this.brain.think(matrix([normalized]))._data[0][0];
    if (thoughts > 0.5) {
      this.ascend();
    }
  }

  _calculateStimuli(closestColumn) {
    this.stimuli[0] = this.y;
    this.stimuli[1] = closestColumn.x;
    this.stimuli[2] = closestColumn.center - closestColumn.openingSize / 2;
    this.stimuli[3] = closestColumn.center + closestColumn.openingSize / 2;
    this.stimuli[4] = closestColumn.center;
  }

  _normalizeStimuli() {
    const normalized = [];
    normalized[0] = this.stimuli[0] / HEIGHT;
    normalized[1] = this.stimuli[1] / WIDTH;
    normalized[2] = this.stimuli[2] / HEIGHT;
    normalized[3] = this.stimuli[3] / HEIGHT;
    normalized[4] = this.stimuli[4] / HEIGHT;

    return normalized;
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

  render(ctx, debug = false) {
    if (this.isDead) return;

    ctx.fillStyle = "#f2aaaa";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    if (debug) {
      if (this.x > this.stimuli[1]) return;
      ctx.strokeStyle = "#f2aaaa";
      ctx.beginPath();
      ctx.moveTo(this.x + this.size / 2, this.y + this.size / 2);
      ctx.lineTo(this.stimuli[1], this.y + this.size / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.x + this.size / 2, this.y + this.size / 2);
      ctx.lineTo(this.stimuli[1], this.stimuli[2]);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.x + this.size / 2, this.y + this.size / 2);
      ctx.lineTo(this.stimuli[1], this.stimuli[3]);
      ctx.stroke();
    }
  }
}

export default Player;
