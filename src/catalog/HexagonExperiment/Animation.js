import * as THREE from 'three';
import Animation from '~/utils/ThreeAnimation';

const _hz = [0.05, 0.3];
const _amp = [0.3, 1];
const _rad = 1;
const _gap = 2;

export default class extends Animation {
    constructor(target) {
        super();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();

        this.renderer = new THREE.WebGLRenderer({
            canvas: target,
            antialias: true,
        });

        const geometry = new THREE.CylinderGeometry(_rad, _rad, 2, 6);
        const material = new THREE.MeshStandardMaterial({
            color: 0xa0a0a0,
            roughness: 1,
            metalness: 0.5,
        });
        // material.wireframe = true;
        material.wireframeLinewidth = 2;
        const positions = [
            [0, 0],

            [1, Math.PI * 0.5],
            [1, Math.PI * (0.5 + 1 / 3)],
            [1, Math.PI * (0.5 + 2 / 3)],
            [1, Math.PI * (0.5 + 3 / 3)],
            [1, Math.PI * (0.5 + 4 / 3)],
            [1, Math.PI * (0.5 + 5 / 3)],

            [2, Math.PI * 0.5],
            [2, Math.PI * (0.5 + 1 / 3)],
            [2, Math.PI * (0.5 + 2 / 3)],
            [2, Math.PI * (0.5 + 3 / 3)],
            [2, Math.PI * (0.5 + 4 / 3)],
            [2, Math.PI * (0.5 + 5 / 3)],

            [Math.sqrt(3), 0],
            [Math.sqrt(3), Math.PI * (1 / 3)],
            [Math.sqrt(3), Math.PI * (2 / 3)],
            [Math.sqrt(3), Math.PI * (3 / 3)],
            [Math.sqrt(3), Math.PI * (4 / 3)],
            [Math.sqrt(3), Math.PI * (5 / 3)],
        ];

        this.hexs = [];
        for (let i = 0; i < positions.length; i++) {
            const hex = new THREE.Mesh(geometry, material);
            hex.position.x = _gap * positions[i][0] * Math.cos(positions[i][1]);
            hex.position.y = _gap * positions[i][0] * Math.sin(positions[i][1]);
            hex.rotation.x = Math.PI / 2;
            hex.rotation.y = Math.PI / 6;
            this.scene.add(hex);
            this.hexs.push(new Hexagon(hex));
        }

        this.camera.position.x = -5;
        this.camera.position.y = -5;
        this.camera.position.z = 10;

        this.camera.quaternion.set(0.28, -0.13, -0.367, 0.87);

        const planeGeo = new THREE.PlaneGeometry(30, 30);
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0x808080,
            side: THREE.DoubleSide,
            roughness: 0.5,
            metalness: 0.6,
        });
        const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
        planeMesh.position.z = 0;
        planeMesh.receiveShadow = true;
        this.scene.add(planeMesh);

        for (let i = 0, a = 0; i < 3; i++, a += Math.PI / 1.5) {
            const light = new THREE.RectAreaLight(0x1e90ff, 5, 5, 5);
            light.position.set(7 * Math.cos(a), 7 * Math.sin(a), 5);
            light.lookAt(0, 0, 0);
            this.scene.add(light);
        }
    }

    animate(delta, elapsed) {
        elapsed /= 1000;
        for (let i = 0; i < this.hexs.length; i++) {
            this.hexs[i].update(elapsed);
        }
        this.render();
    }
}

class Hexagon {
    constructor(mesh) {
        this.mesh = mesh;
        this.hz = between(_hz, Math.random());
        this.amp = between(_amp, Math.random());
        this.num = Math.random();
    }

    update(elapsed) {
        this.mesh.position.z = this.amp * Math.cos((elapsed * this.hz + this.num) * Math.PI * 2);
    }
}

function between(pair, n) {
    return n * (pair[1] - pair[0]) + pair[0];
}
