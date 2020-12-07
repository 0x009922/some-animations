import * as THREE from 'three';
import { AnimationTickFn, createResizer, ThreeAnimationFactory } from '@/modules/simple-three-setup';

const _count = 5;
const _w = 10;
const _h = 10;
// const _speed = 0.5

const create: ThreeAnimationFactory = (canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    // настройка

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    const light = new THREE.PointLight(0xffffff, 1, 100);
    scene.add(light);
    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 60;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.bias = -0.005;
    light.position.set(0, 0, 15);

    const planeGeo = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x483d8b,
        roughness: 0.8,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
    planeMesh.position.z = -5;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    const tris: Triangle[] = [];
    for (let i = 0; i < _count; i++) {
        for (let j = 0; j < _count; j++) {
            tris.push(
                new Triangle(scene, {
                    x: _w * (-0.5 + j / (_count - 1)),
                    y: _h * (-0.5 + i / (_count - 1)),
                }),
            );
        }
    }
    camera.position.z = 20;

    const render = () => renderer.render(scene, camera);

    const animate: AnimationTickFn = (delta, elapsedMs) => {
        const elapsed = elapsedMs * 0.001;
        // this.tris.forEach((x) => x.update(delta * 0.001));

        const r = 10;
        const a = elapsed * Math.PI * 0.1;
        camera.position.set(Math.cos(a) * r, Math.sin(a) * r, 20);
        camera.lookAt(0, 0, 0);

        render();
    };

    return {
        setSize: createResizer({ camera, renderer, render }),
        render,
        animate,
        destroy: () => {},
    };
};

class Triangle {
    private obj: THREE.Mesh;

    public constructor(scene: THREE.Scene, position: { x: number; y: number }) {
        const shape = new THREE.Shape();
        const r = 1;
        for (let i = 0, a = 0; i < 3; i++, a += (Math.PI / 3) * 2) {
            const f = i === 0 ? shape.moveTo : shape.lineTo;
            f.call(shape, r * Math.cos(a), r * Math.sin(a));
        }
        const geom = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
        });
        this.obj = new THREE.Mesh(geom, material);
        scene.add(this.obj);

        this.obj.position.x = position.x;
        this.obj.position.y = position.y;
        this.obj.castShadow = true;

        this.obj.rotation.x = Math.random() * Math.PI * 2;
        this.obj.rotation.y = Math.random() * Math.PI * 2;
    }

    // update(delta) {
    //   this.obj.rotation.x += this.speed[0] * delta;
    //   this.obj.rotation.y += this.speed[1] * delta;
    //   this.obj.rotation.z += this.speed[2] * delta;
    // }
}

export default create;
