import * as THREE from 'three';
import ThreeAnimation from '@/utils/ThreeAnimation';
import { tween, random } from '@/utils';

const { Vector3 } = THREE;

const config = {
  detail: 4,
  icosahedronRadius: 3,
  maxShift: 1.5,
  faceScale: 0.9,
  lights: [
    {
      value: new THREE.Color(0xD72638),
      position: new Vector3(0.5, 0.2, -0.4),
    },
    {
      value: new THREE.Color(0x00ff00),
      position: new Vector3(-0.5, 0, -0.4),
    },
    {
      value: new THREE.Color(0xFF2ECC),
      position: new Vector3(0, -0.5, 0),
    },
    {
      value: new THREE.Color(0x016FB9),
      position: new Vector3(0, 0.4, 0.5),
    },
  ],
  lightsRange: [2.5, 2.7],
  defaultColor: new THREE.Color(0),
  camYSpeed: Math.PI * 2 * 0.0132,
  camXSpeed: Math.PI * 2 * 0.003,
  camStartElapsed: random(100),
};

export default class extends ThreeAnimation {
  constructor(canvas) {
    super();
    this.geometry = new THREE.IcosahedronBufferGeometry(config.icosahedronRadius, config.detail);
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(
      new Array(this.geometry.attributes.position.array.length).fill(0),
      3,
    ));
    const material = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      vertexColors: THREE.VertexColors,
    });
    const mesh = new THREE.Mesh(this.geometry, material);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.scene.add(mesh);

    this.prepareFaces();
    this.skew();
    this.computeColors();
    this.updateLook();
  }

  animate(delta, elapsed) {
    this.updateLook(elapsed * 0.001);
    this.render();
  }

  updateLook(elapsed) {
    elapsed += config.camStartElapsed;
    const y = -elapsed * config.camYSpeed;
    const x = elapsed * config.camXSpeed;

    const pos = new Vector3(Math.cos(y), 0, Math.sin(y));
    const axis = new Vector3(0, Math.sin(x), Math.cos(x));
    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(axis, Math.PI / 2);

    pos.applyQuaternion(quaternion).multiplyScalar(2);

    this.camera.rotation.y = -y;
    this.camera.rotation.x = -x;
    this.camera.position.set(...pos.toArray());
  }

  prepareFaces() {
    this.faces = [];

    const { array } = this.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 9) {
      const vts = [
        new THREE.Vector3(...array.slice(i, i + 3)),
        new THREE.Vector3(...array.slice(i + 3, i + 6)),
        new THREE.Vector3(...array.slice(i + 6, i + 9)),
      ];
      const c = new THREE.Vector3();
      c.add(vts[0]);
      c.add(vts[1]);
      c.add(vts[2]);
      c.divideScalar(3);
      vts.forEach((v, j) => {
        if (config.faceScale) {
          const direction = new Vector3(...c.toArray());
          direction.sub(v);
          direction.multiplyScalar(1 - config.faceScale);
          v.add(direction);
        }
        const points = v.toArray();
        points.forEach((val, k) => {
          array[i + j * 3 + k] = val;
        });
      });
      this.faces.push({
        center: c,
        direction: new Vector3(...c.toArray()).divideScalar(c.length()),
      });
    }
    this.source = [...array];
    this.geometry.attributes.position.needsUpdate = true;
  }

  skew() {
    this.faces.forEach(({ direction }, i) => {
      const shift = random(config.maxShift);
      const deltas = direction.toArray().map((coord) => coord * shift);
      const { array: positions } = this.geometry.attributes.position;
      for (let index = i * 9; index < i * 9 + 9; index++) {
        positions[index] = this.source[index] + deltas[index % 3];
      }
    });
    this.geometry.attributes.position.needsUpdate = true;
  }

  computeColors() {
    const { array: colors } = this.geometry.attributes.color;

    this.faces.forEach(({ center }, index) => {
      const summary = [0, 0, 0];
      for (let j = 0; j < config.lights.length; j++) {
        const computed = compute(config.lights[j], center);
        Object.keys(computed).forEach((key) => {
          summary[key] += computed[key];
        });
      }
      for (let j = 0; j < 9; j++) {
        colors[index * 9 + j] = summary[j % 3] / 3;
      }
    });

    this.geometry.attributes.color.needsUpdate = true;

    function compute(light, vec) {
      const pos = light.position;
      const length = new Vector3(
        pos.x - vec.x,
        pos.y - vec.y,
        pos.z - vec.z,
      ).length();
      if (length <= config.lightsRange[0]) return light.value.toArray();
      if (length >= config.lightsRange[1]) return config.defaultColor.toArray();
      let x = (length - config.lightsRange[0]);
      x /= (config.lightsRange[1] - config.lightsRange[0]);
      return ['r', 'g', 'b'].map((component) => tween(
        light.value[component],
        config.defaultColor[component],
        x,
      ));
    }
  }
}
