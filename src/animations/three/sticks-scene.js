import * as THREE from 'three'
import { Animation } from './Animation'
// import { tween } from '../tools'

const _length = 2
const _rad = 0.05
const _count = 40
const _spawnCubeWidth = 4
const _rotationSpeed = 0.2
const _cameraRad = 5

class Stick {
  constructor () {
    let geom = new THREE.CylinderGeometry(_rad, _rad, _length, 32)
    let material = new THREE.MeshDepthMaterial()
    this.stick = new THREE.Mesh(geom, material)

    this.stick.quaternion.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      2
    ).normalize()
    this.stick.position.set(
      _spawnCubeWidth * (-0.5 + Math.random()),
      _spawnCubeWidth * (-0.5 + Math.random()),
      _spawnCubeWidth * (-0.5 + Math.random())
    )
  }
}

export default class extends Animation {
  constructor (canvas) {
    super()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, 0, 1, 10)
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    })

    this.camera.position.set(0, 0, 5)

    this.sticks = []
    for (let i = 0; i < _count; i++) {
      this.sticks.push(new Stick())
    }

    this.scene.add(...this.sticks.map(x => x.stick))
  }
  animate (delta, elapsed) {
    elapsed *= 0.001
    this.camera.position.x = _cameraRad * Math.cos(elapsed * _rotationSpeed)
    this.camera.position.z = _cameraRad * Math.sin(elapsed * _rotationSpeed)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    this.render()
  }
}
