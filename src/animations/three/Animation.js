export class Animation {
  setSize ({ width, height }) {
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.render()
  }
  destroy () {
    this.renderer.dispose()
  }
  render () {
    this.renderer.render(this.scene, this.camera)
  }
}
