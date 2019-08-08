import * as THREE from 'three'
import { Animation } from './Animation'
import { tween } from '../tools'

const COUNT = 5000
const RADIUS = 1000
const RAD_VEL_NUM_MUL = 0.3
const RAD_VEL_NUM_POW = 1.1
const ANGLE_VEL = 1
const MINIMAL_RADIUS_VEL = 10
const COLORS = [
  0x2F97C1,
  0x2AB7CA,
  0xFE5F55,
  0x06D6A0,
  0xF9C80E
]

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
    this.quaternion = new THREE.Quaternion()
    let angle = Math.PI / 2 * 0.5 + (Math.random() * 2 - 1) * Math.PI / 10
    this.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle)
    // this.appeared = false
    // this.setColor()
  }
  coords () {
    let vec = new THREE.Vector3(
      this.r * Math.cos(this.a),
      this.r * Math.sin(this.a),
      0
    )
    vec.applyQuaternion(this.quaternion)
    return [vec.x, vec.y, vec.z]
    // let zLevel = this.r / RADIUS
    // let zTop = -(this.energy * 2 - 1) * 200
    // return [
    //   this.r * Math.cos(this.a),
    //   this.r * Math.sin(this.a),
    //   zTop * zLevel
    // ]
  }
  rgb () {
    return new Array(3).fill(this.energy)
  }
  animate (t) {
    let vr = Math.pow(this.r, RAD_VEL_NUM_POW) * RAD_VEL_NUM_MUL
    this.vr = -Math.max(vr, MINIMAL_RADIUS_VEL)
    this.r += this.vr * t * this.vre
    this.a += this.va * t * this.vae
    if (this.r <= 15) {
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
    this.scene.fog = new THREE.Fog(0, 600, 1000)
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ canvas: target })

    this.stars = Array(COUNT).fill(0).map((v, i) => {
      return new Star(i / COUNT)
    })
    this.geometry = new THREE.BufferGeometry()
    let verts = []
    let colors = []
    this.stars.forEach((x, i) => {
      verts.push(...x.coords())
      let color = new THREE.Color(COLORS[i % COLORS.length])
      colors.push(color.r, color.g, color.b)
    })
    this.geometry.addAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    this.geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    let material = new THREE.PointsMaterial({
      size: 3,
      color: 0xffffff
      // vertexColors: THREE.VertexColors
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
