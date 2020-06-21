const createCanvas = (parent, width, height) => {
  const canvasEl = document.createElement("canvas");
  canvasEl.width = width;
  canvasEl.height = height;

  parent.appendChild(canvasEl);

  const ctx = canvasEl.getContext("2d");

  return {
    element: canvasEl,
    ctx,
  };
};

export { createCanvas };
