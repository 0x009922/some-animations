import * as THREE from 'three';
import { tween } from '~/utils';
import { AnimationTickFn, createResizer, ThreeAnimationFactory } from '~/modules/simple-three-setup';

const _count = 1000;
const _speed = [5, 10];
const _spawn = -5;

class Line {
    private line: THREE.Line;

    private speed: number;

    public constructor(scene: THREE.Scene) {
        const geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, Math.random()));
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.line = new THREE.Line(geo, material);
        this.speed = tween(_speed, Math.random());
        this.line.position.z = _spawn;
        const r = 5 * Math.random();
        const a = Math.PI * 2 * Math.random();
        this.line.position.x = r * Math.cos(a);
        this.line.position.y = r * Math.sin(a);
        scene.add(this.line);
    }

    public update(delta: number) {
        this.line.position.z += this.speed * delta;
        if (this.line.position.z >= 6) {
            this.line.position.z = _spawn;
        }
    }
}

const factory: ThreeAnimationFactory = (canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer({ canvas });

    const lines: Line[] = [];
    for (let i = 0; i < _count; i++) {
        lines.push(new Line(scene));
    }
    camera.position.z = 5;

    const render = () => renderer.render(scene, camera);

    const animate: AnimationTickFn = (dt) => {
        const delta = dt * 0.001;
        for (let i = 0; i < _count; i++) {
            lines[i].update(delta);
        }
        render();
    };

    return {
        animate,
        setSize: createResizer({ camera, renderer, render }),
    };
};

export default factory;
