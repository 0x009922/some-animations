import * as THREE from 'three'
import { Animation } from './Animation'
import { tween } from '../tools'

const COUNT = 10000
const RADIUS = 1000
const RAD_VEL_NUM_MUL = 0.3
const RAD_VEL_NUM_POW = 1.1
const ANGLE_VEL = 1
const MINIMAL_RADIUS_VEL = 10

function velocityRadiusEnergy (value) {
  return tween(0.2, 1.7, value)
}

function velocityAngleEnergy (value) {
  return tween(0.7, 1, value)
}

// class Buffer {
//   constructor (size) {

//   }
//   setDrawRange (count)
// }

class Star {
  constructor (energy) {
    this.vre = velocityRadiusEnergy(energy)
    this.vae = velocityAngleEnergy(energy)
    this.a = Math.random() * Math.PI * 2
    this.r = Math.random() * RADIUS * 5
    this.vr = 0
    this.va = ANGLE_VEL
    this.energy = energy
    // this.appeared = false
    // this.setColor()
  }
  coords () {
    return [
      this.r * Math.cos(this.a),
      this.r * Math.sin(this.a),
      0
    ]
  }
  rgb () {
    return new Array(3).fill(this.energy)
  }
  animate (t) {
    let vr = Math.pow(this.r, RAD_VEL_NUM_POW) * RAD_VEL_NUM_MUL
    this.vr = -Math.max(vr, MINIMAL_RADIUS_VEL)
    this.r += this.vr * t * this.vre
    this.a += this.va * t * this.vae
    if (this.r <= 0) {
      this.reset()
      // if (!this.appeared) {
      //   this.appeared = true
      //   return true
      // }
    }
  }
  reset () {
    this.a = Math.random() * Math.PI * 2
    this.r = RADIUS
    this.vr = 0
    this.va = ANGLE_VEL
  }
}

export default class extends Animation {
  constructor (target) {
    super()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ canvas: target })

    this.stars = Array(COUNT).fill(0).map((v, i) => {
      return new Star(i / COUNT)
    })
    this.geometry = new THREE.BufferGeometry()
    let verts = []
    let colors = []
    this.stars.forEach(x => {
      verts.push(...x.coords())
      colors.push(...x.rgb())
    })
    this.geometry.addAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    this.geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    let material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: THREE.VertexColors
    })
    let points = new THREE.Points(this.geometry, material)
    this.scene.add(points)
    this.camera.position.set(0, 0, 600)

    // this.geometry.setDrawRange(0, 0)
    // this.appeared = 0
  }
  animate (delta) {
    let t = delta * 0.001
    let { position } = this.geometry.attributes
    this.stars.forEach((x, i) => {
      // let appeared = x.animate(t)
      // if (appeared) {
      //   this.appeared += 1
      //   // console.log('appeared', this.appeared)
      // }
      x.animate(t)
      x.coords().forEach((value, j) => {
        position.array[i * 3 + j] = value
      })
    })
    position.needsUpdate = true
    // this.geometry.setDrawRange(0, this.appeared)
    this.render()
  }
}
