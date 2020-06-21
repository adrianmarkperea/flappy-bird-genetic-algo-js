import { HEIGHT } from "../globals";

class ColumnPair {
  constructor(x) {
    this.x = x;
    this.width = 80;
    this.speed = -3;

    this.openingSize = 200;
    this._calculateCenter();
  }

  _calculateCenter() {
    // We want the center to be constrained to at most one and a half
    // openingSize units away from the top and bottom of the screen
    const minCenterY = this.openingSize * 1.5;
    const maxCenterY = HEIGHT - this.openingSize * 1.5;
    this.center = Math.floor(
      Math.random() * (maxCenterY - minCenterY + 1) + minCenterY
    );
  }

  isOffScreen() {
    return this.x <= -this.width;
  }

  update() {
    this.x += this.speed;
  }

  render(ctx) {
    ctx.fillStyle = "#9bdeac";
    ctx.fillRect(this.x, 0, this.width, this.center - this.openingSize / 2);
    ctx.fillRect(
      this.x,
      this.center + this.openingSize / 2,
      this.width,
      HEIGHT - (this.center + this.openingSize / 2)
    );
  }
}

export default ColumnPair;
