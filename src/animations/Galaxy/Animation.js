import * as THREE from 'three';
import Animation from '@/utils/ThreeAnimation';
import { tween } from '@/utils';

const COUNT = 5000;
const RADIUS = 1000;
const RAD_VEL_NUM_MUL = 0.3;
const RAD_VEL_NUM_POW = 1.1;
const ANGLE_VEL = 1;
const MINIMAL_RADIUS_VEL = 10;
const COLORS = [0x2f97c1, 0x2ab7ca, 0xfe5f55, 0x06d6a0, 0xf9c80e];

function velocityRadiusEnergy(value) {
    return tween(0.2, 1.7, value);
}

function velocityAngleEnergy(value) {
    return tween(0.7, 1, value);
}

class Star {
    constructor(energy) {
        this.vre = velocityRadiusEnergy(energy);
        this.vae = velocityAngleEnergy(energy);
        this.a = Math.random() * Math.PI * 2;
        this.r = Math.random() * RADIUS * 5;
        this.vr = 0;
        this.va = ANGLE_VEL;
        this.energy = energy;
        this.quaternion = new THREE.Quaternion();
        const angle = (Math.PI / 2) * 0.5 + ((Math.random() * 2 - 1) * Math.PI) / 10;
        this.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
    }

    coords() {
        const vec = new THREE.Vector3(this.r * Math.cos(this.a), this.r * Math.sin(this.a), 0);
        vec.applyQuaternion(this.quaternion);
        return [vec.x, vec.y, vec.z];
    }

    rgb() {
        return new Array(3).fill(this.energy);
    }

    animate(t) {
        const vr = this.r ** RAD_VEL_NUM_POW * RAD_VEL_NUM_MUL;
        this.vr = -Math.max(vr, MINIMAL_RADIUS_VEL);
        this.r += this.vr * t * this.vre;
        this.a += this.va * t * this.vae;
        if (this.r <= 15) {
            this.reset();
        }
    }

    reset() {
        this.a = Math.random() * Math.PI * 2;
        this.r = RADIUS;
        this.vr = 0;
        this.va = ANGLE_VEL;
    }
}

export default class extends Animation {
    constructor(target) {
        super();
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0, 600, 1000);
        this.camera = new THREE.PerspectiveCamera();
        this.renderer = new THREE.WebGLRenderer({ canvas: target });

        this.stars = Array(COUNT)
            .fill(0)
            .map((v, i) => new Star(i / COUNT));
        this.geometry = new THREE.BufferGeometry();
        const verts = [];
        const colors = [];
        this.stars.forEach((x, i) => {
            verts.push(...x.coords());
            const color = new THREE.Color(COLORS[i % COLORS.length]);
            colors.push(color.r, color.g, color.b);
        });
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
        this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({
            size: 3,
            color: 0xffffff,
        });
        const points = new THREE.Points(this.geometry, material);
        this.scene.add(points);
        this.camera.position.set(0, 0, 600);
    }

    animate(delta) {
        const t = delta * 0.001;
        const { position } = this.geometry.attributes;
        this.stars.forEach((x, i) => {
            x.animate(t);
            x.coords().forEach((value, j) => {
                position.array[i * 3 + j] = value;
            });
        });
        position.needsUpdate = true;
        this.render();
    }
}
