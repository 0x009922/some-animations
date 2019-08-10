import { Scene } from './Scene'
import { rgb } from '../tools'

export default class extends Scene {
  constructor (canvas) {
    super(canvas)
    this.fragments = [new Fragment()]
    canvas.style['background'] = rgb(START_TONE, START_TONE, START_TONE)
  }
  render (delta) {
    let t = delta * 0.001

    this.fragments.forEach(x => x.update(t))
    if (this.fragments[0].getProgress() >= FRAGMENTS_SPAWN_THRESHOLD) {
      this.fragments.unshift(new Fragment())
    }
    while (
      this.fragments.length - 2 >= 0 &&
      this.fragments[this.fragments.length - 2].getProgress() >= 1 + FRAGMENTS_SPAWN_THRESHOLD
    ) {
      this.fragments.pop()
    }

    let { width, height } = this.canvas

    this.context.clearRect(0, 0, width, height)
    this.fragments.forEach(x => x.draw(
      this.context,
      [width / 2, height / 2]
    ))
  }
}

const FRAGMENT_TIME = 5
const MOVEMENT_THRESHOLD = 0.1
const START_TONE = 240
const END_TONE = 40
const START_RAD = 350
const END_RAD = 130
const DELTA_ANGLE = 0.35
const FRAGMENTS_SPAWN_THRESHOLD = 0.14

class Fragment {
  constructor () {
    this.progress = 0
  }
  update (t) {
    this.progress += t / FRAGMENT_TIME
    return this.progress
  }
  getProgress () {
    return this.progress
  }
  draw (context, center) {
    context.fillStyle = this.getColor()
    context.beginPath()

    let movementProgress = (this.progress - MOVEMENT_THRESHOLD) /
      (1 - MOVEMENT_THRESHOLD)
    movementProgress = Math.pow(movementProgress, 0.9)
    if (this.progress <= MOVEMENT_THRESHOLD) {
      movementProgress = 0
    }

    let startAngle = -Math.PI * 3 / 4 + DELTA_ANGLE * movementProgress
    let radius = Math.pow(movementProgress, 0.8) * (END_RAD - START_RAD) +
      START_RAD
    radius = (radius < 0) ? 0 : radius

    for (let i = 0, a = startAngle; i < 4; i++, a += Math.PI / 2) {
      let point = [
        center[0] + radius * Math.cos(a),
        center[1] + radius * Math.sin(a)
      ]
      let func = !i ? context.moveTo : context.lineTo
      func.apply(context, [point[0], point[1]])
    }

    context.closePath()
    context.fill()
  }
  getColor () {
    let localProgress = this.progress / (1 - FRAGMENTS_SPAWN_THRESHOLD)
    localProgress = (localProgress < 0) ? 0 : (localProgress > 1) ? 1 : localProgress
    let num = Math.round(localProgress * (END_TONE - START_TONE)) + START_TONE
    return rgb(num, num, num)
  }
}
