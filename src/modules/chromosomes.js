import { Chromosome } from "@adrianperea/genie.js";

function createMatrixChromosome(rows, columns) {
  return new Chromosome(rows * columns, () => Math.random() * 2 - 1);
}

export { createMatrixChromosome };
