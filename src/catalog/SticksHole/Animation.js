import * as THREE from 'three';
import Animation from '@/utils/ThreeAnimation';
import { tween } from '@/utils';

const _length = 2;
const _rad = 0.02;
const _count = 50;
const _spawnCubeWidth = 4;
const _speed = 1;
const _start = -10;
const _end = 8;

class Stick {
    constructor() {
        const geom = new THREE.CylinderGeometry(_rad, _rad, _length, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0.9,
        });
        this.stick = new THREE.Mesh(geom, material);

        this.stick.quaternion
            .set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 1)
            .normalize();
        this.stick.position.set(
            _spawnCubeWidth * (-0.5 + Math.random()),
            _spawnCubeWidth * (-0.5 + Math.random()),
            tween([_start, _end], Math.random()),
        );
    }

    update(delta) {
        this.stick.position.z += delta * _speed;
        if (this.stick.position.z >= _end) {
            this.stick.position.z = _start;
            this.stick.quaternion
                .set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 1)
                .normalize();
        }
    }
}

function createGrid(scene) {
    const _width = 3;
    const _yStart = 1;

    const material = new THREE.LineBasicMaterial({
        color: 0x101010,
        linewidth: 6,
    });
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(_width, 0, 0));

    for (let i = 0; i < 10; i++) {
        const line = new THREE.Line(geometry, material);
        line.position.set(-_width / 2, _yStart - i * 0.3, 2);
        scene.add(line);
    }

    for (let i = 0; i < 10; i++) {
        const line = new THREE.Line(geometry, material);
        line.position.set(_width * (-0.5 + i / 9), _yStart, 2);
        line.rotation.z = -Math.PI / 2;
        scene.add(line);
    }
}

export default class extends Animation {
    constructor(canvas) {
        super();
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        this.camera = new THREE.PerspectiveCamera(45, 0, 0.001, 100);
        this.camera.position.set(0, 0, 5);

        const light = new THREE.PointLight(0xffffff, 10, 13);
        light.position.set(0, 0, 5);
        this.scene.add(light);

        createGrid(this.scene);

        this.sticks = [];
        for (let i = 0; i < _count; i++) {
            this.sticks.push(new Stick());
        }
        this.scene.add(...this.sticks.map((x) => x.stick));
    }

    animate(delta) {
        delta *= 0.001;
        this.sticks.forEach((x) => x.update(delta));

        this.render();
    }
}
