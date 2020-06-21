import * as matrix from "./matrix";
import { multiply, max, exp } from "mathjs";

function relu(x) {
  return max(0, x);
}

function sigmoid(x) {
  return 1 / (1 + exp(-x));
}

class Brain {
  constructor(numInputs, numHidden, numOutputs, weightsIH, weightsHO) {
    this.numInputs = numInputs;
    this.numHidden = numHidden;
    this.numOutputs = numOutputs;

    this.weightsIH = matrix.random(this.numInputs, this.numHidden);
    this.weightsHO = matrix.random(this.numHidden, this.numOutputs);
  }

  think(input) {
    const hiddenOutput = multiply(input, this.weightsIH).map(relu);
    const output = multiply(hiddenOutput, this.weightsHO).map(sigmoid);

    return output;
  }
}

export default Brain;
