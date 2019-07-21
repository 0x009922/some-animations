import * as THREE from 'three'
import { Animation, tween } from './Animation'

const _count = 1000
const _speed = [5, 10]
const _spawn = -5

class Line {
  constructor (scene) {
    let geo = new THREE.Geometry()
    geo.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, Math.random())
    )
    let material = new THREE.LineBasicMaterial({
      color: 0xffffff
    })
    this.line = new THREE.Line(geo, material)
    this.speed = tween(_speed, Math.random())
    this.line.position.z = _spawn
    let r = 5 * Math.random()
    let a = Math.PI * 2 * Math.random()
    this.line.position.x = r * Math.cos(a)
    this.line.position.y = r * Math.sin(a)
    scene.add(this.line)
  }

  update (delta) {
    this.line.position.z += this.speed * delta
    if (this.line.position.z >= 6) {
      this.line.position.z = _spawn
    }
  }
}

export default class extends Animation {
  constructor (target) {
    super()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ canvas: target })

    this.lines = []
    for (let i = 0; i < _count; i++) {
      this.lines.push(new Line(this.scene))
    }
    this.camera.position.z = 5
  }
  animate (delta) {
    delta *= 0.001
    for (let i = 0; i < _count; i++) {
      this.lines[i].update(delta)
    }
    this.render()
  }
}
