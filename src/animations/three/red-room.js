import * as THREE from 'three'
import { Animation } from './Animation'
import { tween } from '../tools'

const _volume = 5
const _cube = 0.45
const _cubesCount = 20
const _moveDistance = 1
const _hz = [0.3, 1]
const _camSpeed = 0.01
const _color = 0x600000

class Cube {
  constructor (x, y, z, dx, dy, dz) {
    let geometry = new THREE.BoxGeometry(_cube, _cube, _cube)
    let material = new THREE.MeshStandardMaterial({
      color: _color,
      roughness: 1,
      metalness: 0.3
    })
    // material.wireframe = true;
    material.wireframeLinewidth = 2
    this.cube = new THREE.Mesh(geometry, material)

    this.pos = new THREE.Vector3(x, y, z)
    this.cube.position.set(x, y, z)

    this.dir = new THREE.Vector3(dx, dy, dz)

    this.num = Math.random()
    this.amp = Math.random() * _moveDistance / 2
    this.hz = tween(_hz, Math.random())
  }
  update (elapsed) {
    let n = this.amp + this.amp * Math.sin(
      (elapsed * this.hz + this.num) * Math.PI * 2
    )
    this.cube.position.set(this.pos.x, this.pos.y, this.pos.z)
    let dir = new THREE.Vector3(
      this.dir.x,
      this.dir.y,
      this.dir.z
    ).multiplyScalar(n)
    this.cube.position.add(dir)
  }
}

export default class extends Animation {
  constructor (canvas) {
    super()
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ canvas })
    this.camera = new THREE.PerspectiveCamera(100, 0, 0.1, 100)
    this.camera.position.set(0, 0, 0)

    let light = new THREE.PointLight(0xffffff, 15, 15, 5)
    light.position.set(0, 0, 0)
    this.scene.add(light)

    this.initCubes()
    this.scene.add(...this.cubes.map(x => x.cube))

    this.speed = new THREE.Vector3(
      (Math.random() * 2 - 1) * _camSpeed,
      (Math.random() * 2 - 1) * _camSpeed,
      (Math.random() * 2 - 1) * _camSpeed
    )
  }
  animate (delta, elapsed) {
    elapsed *= 0.001
    this.cubes.forEach(x => x.update(elapsed))

    let state = Math.sin(elapsed * Math.PI * 2 * 0.05)
    this.camera.fov = 75 + 50 * state
    // camera.position.z = 3 * state;
    this.camera.rotation.y = elapsed * Math.PI * 2 * this.speed.x
    this.camera.rotation.x = elapsed * Math.PI * 2 * this.speed.y
    this.camera.rotation.z = elapsed * Math.PI * 2 * this.speed.z
    this.camera.updateProjectionMatrix()

    this.render()
  }
  initCubes () {
    let verts = []
    verts.push(new THREE.Vector3(0, 0, 1))
    let cell = _volume * 2 / _cubesCount
    for (let r = 0; r < _cubesCount; r++) {
      for (let c = 0; c < _cubesCount; c++) {
        verts.push(new THREE.Vector3(
          -_volume + cell * (c + 0.5),
          -_volume + cell * (r + 0.5),
          -_volume
        ))
      }
    }
    this.cubes = []

    let axisAngles = [
      null,
      [[0, 1, 0], Math.PI / 2],
      [[0, 1, 0], Math.PI / 2],
      [[0, 1, 0], Math.PI / 2],
      [[0, 0, 1], Math.PI / 2],
      [[0, 0, 1], Math.PI]
    ]
    axisAngles.forEach(value => {
      if (value) {
        let [axis, angle] = value
        rotate(verts, new THREE.Vector3(...axis), angle)
      }
      let dir = verts[0]
      this.cubes.push(...verts.map((vector, i) => {
        if (!i) return null
        return new Cube(
          vector.x - dir.x * _cube / 2,
          vector.y - dir.y * _cube / 2,
          vector.z - dir.z * _cube / 2,
          dir.x,
          dir.y,
          dir.z
        )
      }))
    })

    this.cubes = this.cubes.filter(x => x)

    function rotate (verts, axis, angle) {
      let quat = new THREE.Quaternion()
      quat.setFromAxisAngle(axis, angle)
      for (let i = 0; i < verts.length; i++) {
        verts[i].applyQuaternion(quat)
      }
    }
  }
}
