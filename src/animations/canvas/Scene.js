export class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  render() {
    this.context.clearRect(0, 0, 1000, 1000);
  }
}
