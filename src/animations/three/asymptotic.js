import * as THREE from 'three';
import { Animation } from './Animation';
import { tween, random } from '../tools';

const config = {
  xRange: [55, 0],
  lifeTime: [5, 7],
  count: 20000,
  spawnPerSecond: 1000,
  fadeIn: 0.2,
  color: 0xDEE7E7,
};
const itemSpawn = 1 / config.spawnPerSecond;

function yx(x) {
  return 30 / x - 5;
}

function progress(p) {
  return Math.sqrt(p);
}

export default class extends Animation {
  constructor(canvas) {
    super();
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0, 0.03);
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.geometry = new THREE.BufferGeometry();
    this.geometry.addAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        new Array(config.count * 3).fill(0),
        3,
      ),
    );
    this.scene.add(
      new THREE.Points(
        this.geometry,
        new THREE.PointsMaterial({
          color: config.color,
          size: 0.1,
        }),
      ),
    );

    this.dots = [new Dot()];
    this.spawnOverflow = 0;

    this.camera.position.set(0, 10, 25);
    this.camera.lookAt(0, 0, 0);
  }

  animate(delta, elapsed) {
    const dt = delta * 0.001;
    if (this.dots.length <= config.count) {
      this.spawn(dt);
    }

    const { array } = this.geometry.attributes.position;
    this.dots.forEach((x, i) => {
      x.update(dt);
      const pos = x.position;
      array[i * 3] = pos[0];
      array[i * 3 + 1] = pos[1];
      array[i * 3 + 2] = pos[2];
    });
    this.geometry.setDrawRange(0, this.dots.length);
    this.geometry.attributes.position.needsUpdate = true;

    this.updateView(elapsed);

    this.render();
  }

  updateView(elapsed) {
    const el = elapsed * 0.001;
    const angle = el * 0.1;
    this.camera.position.set(
      5,
      Math.sin(angle) * 20,
      Math.cos(angle) * 20,
    );
    this.camera.lookAt(0, 0, 0);
  }

  spawn(dt) {
    this.spawnOverflow += dt;
    let spawn = ~~(this.spawnOverflow / itemSpawn);
    this.spawnOverflow -= spawn * itemSpawn;
    while (spawn > 0 && this.dots.length <= config.count) {
      this.dots.push(new Dot());
      spawn--;
    }
  }
}

class Dot {
  constructor() {
    this.time = 0;
    this.lifeTime = tween(config.lifeTime, random());
    this.angle = random(Math.PI * 2);
    this.cos = Math.cos(this.angle);
    this.sin = Math.sin(this.angle);
  }

  update(dt) {
    this.time = (this.time + dt) % this.lifeTime;
    this.progress = progress(this.time / this.lifeTime);
  }

  get position() {
    const x = tween(config.xRange, this.progress);
    return [
      this.cos * x,
      yx(x),
      this.sin * x,
    ];
  }
}
