import { Animation } from './Animation'
import * as THREE from 'three'

const ROTATION_SPEED = 1.1
const MIN_SIZE = 0.1
const MAX_SIZE = 1
const COUNT = 10
const RAD_SHIFT = 1.4
const CAMERA_DISTANCE = 1.5

const sizeStep = (MAX_SIZE - MIN_SIZE) / (COUNT - 1)
const angleStep = RAD_SHIFT / (COUNT - 1)

export default class extends Animation {
  constructor (canvas) {
    super()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    })

    let material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2.5
    })
    for (let i = 0; i < COUNT; i++) {
      let size = MAX_SIZE - i * sizeStep
      let angle = i * angleStep + Math.PI / 2
      let geometry = new THREE.BoxGeometry(size, size, size)
      let edges = new THREE.EdgesGeometry(geometry)
      let lines = new THREE.LineSegments(edges, material)
      lines.rotateY(angle)
      this.scene.add(lines)
    }

    this.viewAngle = 0
  }
  animate (delta) {
    this.viewAngle += ROTATION_SPEED * delta * 0.001
    this.camera.position.set(
      Math.cos(this.viewAngle) * CAMERA_DISTANCE,
      Math.cos(Math.PI / 4) * CAMERA_DISTANCE,
      Math.sin(this.viewAngle) * CAMERA_DISTANCE
    )
    this.camera.lookAt(0, 0, 0)
    this.render()
  }
}
