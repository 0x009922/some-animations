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

export function tween (...args) {
  if (args.length === 2) {
    let [[start, end], n] = args
    return n * (end - start) + start
  }
}

export function rgb (...args) {
  if (args.length === 0 && Array.isArray(args[0])) {
    return `rgb(${args[0].join(',')})`
  }
  if (args.length === 3) {
    return `rgb(${args.join(',')})`
  }
  return null
}
