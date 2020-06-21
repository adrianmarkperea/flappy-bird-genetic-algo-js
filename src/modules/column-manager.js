import { WIDTH } from "../globals";
import ColumnPair from "./column-pair";

class ColumnManager {
  constructor() {
    this.startX = 300;
    this.columnGap = 300;
    this.maxNumOnScreen = Math.ceil(WIDTH / this.columnGap);

    this.columnPairs = Array(this.maxNumOnScreen)
      .fill(null)
      .map((_, index) => new ColumnPair(this.startX + this.columnGap * index));
  }

  hits(player) {
    return this.columnPairs[0].hits(player);
  }

  update() {
    this.columnPairs.forEach((cp) => cp.update());

    if (!this.columnPairs[0].isOffScreen()) {
      return;
    }

    this.columnPairs = this._addNewAtEnd(this._removeFront(this.columnPairs));
  }

  _removeFront(columnPairs) {
    return columnPairs.slice(1);
  }

  _addNewAtEnd(columnPairs) {
    const [columnPairAtEnd] = columnPairs.slice(-1);
    return [...columnPairs, new ColumnPair(columnPairAtEnd.x + this.columnGap)];
  }

  render(ctx) {
    this.columnPairs.forEach((cp) => cp.render(ctx));
  }
}

export default ColumnManager;
