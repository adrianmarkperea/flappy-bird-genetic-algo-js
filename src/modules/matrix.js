import { matrix } from "mathjs";

function random(numRows, numCols) {
  const data = Array(numRows)
    .fill(null)
    .map((_) => Array(numCols).fill(Math.random() * 2 - 1));

  return matrix(data);
}

export { random };
