/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import * as THREE from 'three';
// import Animation from '~/utils/ThreeAnimation';
import { tween } from '~/utils';
import { AnimationTickFn, createResizer, ThreeAnimationFactory } from '~/modules/simple-three-setup';

const _volume = 5;
const _cube = 0.45;
const _cubesCount = 20;
const _moveDistance = 1;
const _hz = [0.3, 1];
const _camSpeed = 0.01;
const _color = 0x600000;

class Cube {
    public cube: THREE.Mesh;

    private pos: THREE.Vector3;

    private dir: THREE.Vector3;

    private num: number;

    private amp: number;

    private hz: number;

    // eslint-disable-next-line max-params
    constructor(x: number, y: number, z: number, dx: number, dy: number, dz: number) {
        const geometry = new THREE.BoxGeometry(_cube, _cube, _cube);
        const material = new THREE.MeshStandardMaterial({
            color: _color,
            roughness: 1,
            metalness: 0.3,
        });
        // material.wireframe = true;
        material.wireframeLinewidth = 2;
        this.cube = new THREE.Mesh(geometry, material);

        this.pos = new THREE.Vector3(x, y, z);
        this.cube.position.set(x, y, z);

        this.dir = new THREE.Vector3(dx, dy, dz);

        this.num = Math.random();
        this.amp = (Math.random() * _moveDistance) / 2;
        this.hz = tween(_hz, Math.random());
    }

    update(elapsed: number) {
        const n = this.amp + this.amp * Math.sin((elapsed * this.hz + this.num) * Math.PI * 2);
        this.cube.position.set(this.pos.x, this.pos.y, this.pos.z);
        const dir = new THREE.Vector3(this.dir.x, this.dir.y, this.dir.z).multiplyScalar(n);
        this.cube.position.add(dir);
    }
}

function rotate(vertstoRotate: THREE.Vector3[], axis: THREE.Vector3, angle: number): void {
    const quat = new THREE.Quaternion();
    quat.setFromAxisAngle(axis, angle);
    for (const item of vertstoRotate) {
        item.applyQuaternion(quat);
    }
}

function createCubes(): Cube[] {
    const verts: THREE.Vector3[] = [];
    verts.push(new THREE.Vector3(0, 0, 1));
    const cell = (_volume * 2) / _cubesCount;
    for (let r = 0; r < _cubesCount; r++) {
        for (let c = 0; c < _cubesCount; c++) {
            verts.push(new THREE.Vector3(-_volume + cell * (c + 0.5), -_volume + cell * (r + 0.5), -_volume));
        }
    }
    const cubes: Cube[] = [];

    const axisAngles: (null | [[number, number, number], number])[] = [
        null,
        [[0, 1, 0], Math.PI / 2],
        [[0, 1, 0], Math.PI / 2],
        [[0, 1, 0], Math.PI / 2],
        [[0, 0, 1], Math.PI / 2],
        [[0, 0, 1], Math.PI],
    ];
    axisAngles.forEach((value) => {
        if (value) {
            const [axis, angle] = value;
            rotate(verts, new THREE.Vector3(...axis), angle);
        }
        const dir = verts[0];
        cubes.push(
            ...verts.reduce<Cube[]>((acc, vector, i) => {
                if (!i) return acc;
                const item = new Cube(
                    vector.x - (dir.x * _cube) / 2,
                    vector.y - (dir.y * _cube) / 2,
                    vector.z - (dir.z * _cube) / 2,
                    dir.x,
                    dir.y,
                    dir.z,
                );
                acc.push(item);
                return acc;
            }, []),
        );
    });

    return cubes;
}

const factory: ThreeAnimationFactory = (canvas) => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas });
    const camera = new THREE.PerspectiveCamera(100, 0, 0.1, 100);
    camera.position.set(0, 0, 0);

    const light = new THREE.PointLight(0xffffff, 15, 15, 5);
    light.position.set(0, 0, 0);
    scene.add(light);

    const cubes = createCubes();
    cubes.forEach((x) => scene.add(x.cube));

    const speed = new THREE.Vector3(
        (Math.random() * 2 - 1) * _camSpeed,
        (Math.random() * 2 - 1) * _camSpeed,
        (Math.random() * 2 - 1) * _camSpeed,
    );

    const render = () => renderer.render(scene, camera);

    const animate: AnimationTickFn = (delta, elapsedMs) => {
        const elapsed = elapsedMs * 0.001;
        cubes.forEach((x) => x.update(elapsed));

        const state = Math.sin(elapsed * Math.PI * 2 * 0.05);
        camera.fov = 75 + 50 * state;
        // camera.position.z = 3 * state;
        camera.rotation.y = elapsed * Math.PI * 2 * speed.x;
        camera.rotation.x = elapsed * Math.PI * 2 * speed.y;
        camera.rotation.z = elapsed * Math.PI * 2 * speed.z;
        camera.updateProjectionMatrix();

        render();
    };

    return {
        animate,
        setSize: createResizer({ render, renderer, camera }),
        destroy: () => {},
    };
};

export default factory;
