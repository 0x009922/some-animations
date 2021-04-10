import * as THREE from 'three';
import { tween } from '~/utils';

const RADIUS = 1000;
const RAD_VEL_NUM_MUL = 0.3;
const RAD_VEL_NUM_POW = 1.1;
const ANGLE_VEL = 1;
const MINIMAL_RADIUS_VEL = 10;

function velocityRadiusEnergy(value: number) {
    return tween(0.2, 1.7, value);
}

function velocityAngleEnergy(value: number) {
    return tween(0.7, 1, value);
}

export default class Star {
    private vre: number;
    private vae: number;
    private a: number;
    private r: number;
    private vr: number;
    private va: number;
    private energy: number;
    private quaternion: THREE.Quaternion;

    public constructor(energy: number) {
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

    public coords() {
        const vec = new THREE.Vector3(this.r * Math.cos(this.a), this.r * Math.sin(this.a), 0);
        vec.applyQuaternion(this.quaternion);
        return [vec.x, vec.y, vec.z];
    }

    public rgb() {
        return new Array(3).fill(this.energy);
    }

    public animate(t: number) {
        const vr = this.r ** RAD_VEL_NUM_POW * RAD_VEL_NUM_MUL;
        this.vr = -Math.max(vr, MINIMAL_RADIUS_VEL);
        this.r += this.vr * t * this.vre;
        this.a += this.va * t * this.vae;
        if (this.r <= 15) {
            this.reset();
        }
    }

    public reset() {
        this.a = Math.random() * Math.PI * 2;
        this.r = RADIUS;
        this.vr = 0;
        this.va = ANGLE_VEL;
    }
}
