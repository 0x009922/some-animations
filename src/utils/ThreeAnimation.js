export default class {
  setSize({ width, height }) {
    if (!this.renderer || !this.camera) {
      return;
    }
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.render();
  }

  destroy() {
    this.renderer.dispose();
    this.scene.traverse((x) => {
      if ('geometry' in x) {
        x.geometry.dispose();
        // console.log('disposed geometry');
      }
      if ('material' in x) {
        x.material.dispose();
        // console.log('disposed material');
      }
    });
    this.scene.dispose();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
