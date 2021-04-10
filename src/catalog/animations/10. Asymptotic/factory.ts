import * as THREE from 'three';
import { AnimationTickFn, createResizer, defineThreeAnimationFactory } from '~/modules/simple-three-setup';
// import Animation from '~/utils/ThreeAnimation';
import { tween, random } from '~/utils';

const config = {
    xRange: [55, 0],
    lifeTime: [5, 7],
    count: 20000,
    spawnPerSecond: 1000,
    fadeIn: 0.2,
    color: 0xdee7e7,
};
const itemSpawn = 1 / config.spawnPerSecond;

function yx(x: number) {
    return 30 / x - 5;
}

function progress(p: number) {
    return Math.sqrt(p);
}

export default defineThreeAnimationFactory((canvas) => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0, 0.03);
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Array(config.count * 3).fill(0), 3));
    scene.add(
        new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: config.color,
                size: 0.1,
            }),
        ),
    );

    const dots = [new Dot()];
    let spawnOverflow = 0;

    camera.position.set(0, 10, 25);
    camera.lookAt(0, 0, 0);

    function spawn(dt: number) {
        spawnOverflow += dt;
        let spawn = ~~(spawnOverflow / itemSpawn);
        spawnOverflow -= spawn * itemSpawn;
        while (spawn > 0 && dots.length <= config.count) {
            dots.push(new Dot());
            spawn--;
        }
    }

    function updateView(elapsed: number) {
        const el = elapsed * 0.001;
        const angle = el * 0.1;
        camera.position.set(5, Math.sin(angle) * 20, Math.cos(angle) * 20);
        camera.lookAt(0, 0, 0);
    }

    const render = () => renderer.render(scene, camera);

    const animate: AnimationTickFn = (detla, elapsed) => {
        const dt = detla * 0.001;
        if (dots.length <= config.count) {
            spawn(dt);
        }

        const { array } = geometry.attributes.position;
        dots.forEach((x, i) => {
            x.update(dt);
            const pos = x.position;
            [array[i * 3] as any, array[i * 3 + 1] as any, array[i * 3 + 2] as any] = pos;
        });
        geometry.setDrawRange(0, dots.length);
        geometry.attributes.position.needsUpdate = true;

        updateView(elapsed);

        render();
    };

    return {
        animate,
        setSize: createResizer({ render, renderer, camera }),
    };
});

class Dot {
    private time: number;
    private lifeTime: number;
    private angle: number;
    private cos: number;
    private sin: number;
    private progress = 0;

    public constructor() {
        this.time = 0;
        this.lifeTime = tween(config.lifeTime, random());
        this.angle = random(Math.PI * 2);
        this.cos = Math.cos(this.angle);
        this.sin = Math.sin(this.angle);
    }

    public update(dt: number) {
        this.time = (this.time + dt) % this.lifeTime;
        this.progress = progress(this.time / this.lifeTime);
    }

    public get position() {
        const x = tween(config.xRange, this.progress);
        return [this.cos * x, yx(x), this.sin * x];
    }
}
