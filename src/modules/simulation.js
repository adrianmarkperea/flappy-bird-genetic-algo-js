import { Simulation } from "@adrianperea/genie.js";
import ColumnManager from "./column-manager";

class FlappyBird extends Simulation {
  init() {
    this.columnManager = new ColumnManager();
  }

  calculateFitness(individual, data) {
    return individual.score;
  }

  loop() {
    if (!this.finished) {
      if (!this.updateFinished) {
        this._update();
      } else {
        this._calculateFitness();
        this._evaluate();

        if (!this.finished) {
          this._generate();
        }
      }

      this.rafId = setTimeout(() => this.loop(), 1 / 60);
    }
  }

  update() {
    this.columnManager.update();

    const closestColumn = this.columnManager.getClosestColumn();
    this.population.forEach((player) => {
      player.update();
      player.checkIsDead(this.columnManager.getClosestColumn());
      player.attemptScore(this.columnManager.getClosestColumn());

      player.think(closestColumn);
    });

    const isAllDead = this.population.every((player) => player.isDead);

    if (isAllDead) {
      // TODO: RESET
      this.columnManager = new ColumnManager();
      return true;
    }

    return false;
  }

  getState() {
    return { columnManager: this.columnManager };
  }
}

export default FlappyBird;
