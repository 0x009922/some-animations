import * as THREE from 'three';
import { Animation } from './Animation';

export default class extends Animation {
  constructor(target) {
    super();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: target });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x0,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.PointLight(0xff0000, 1, 15, 2);
    scene.add(light);

    scene.add(new THREE.GridHelper(3, 3));
    scene.add(new THREE.AxesHelper(5, 5, 5));

    light.position.set(0, 0, 2);
    camera.position.set(0, 3, 5);
    camera.lookAt(0, 0, 0);

    this.camera = camera;
    this.renderer = renderer;
    this.cube = cube;
    this.scene = scene;
  }

  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.02;
    this.render();
  }
}
