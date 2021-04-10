import { Mesh, CylinderGeometry, MeshDepthMaterial, Scene, WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { AnimationTickFn, createResizer, ThreeAnimationFactory } from '~/modules/simple-three-setup';
import { createArrayFrom } from '~/utils/create-array';

const _length = 2;
const _rad = 0.05;
const _count = 40;
const _spawnCubeWidth = 4;
const _rotationSpeed = 0.2;
const _cameraRad = 5;

class Stick {
    public stick: Mesh;

    public constructor() {
        const geom = new CylinderGeometry(_rad, _rad, _length, 32);
        const material = new MeshDepthMaterial();
        this.stick = new Mesh(geom, material);

        this.stick.quaternion
            .set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 2)
            .normalize();
        this.stick.position.set(
            _spawnCubeWidth * (-0.5 + Math.random()),
            _spawnCubeWidth * (-0.5 + Math.random()),
            _spawnCubeWidth * (-0.5 + Math.random()),
        );
    }
}

const create: ThreeAnimationFactory = (canvas) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 0, 1, 10);
    const renderer = new WebGLRenderer({
        canvas,
        antialias: true,
    });

    camera.position.set(0, 0, 5);

    const sticks = createArrayFrom(_count, () => new Stick());
    sticks.forEach((x) => scene.add(x.stick));

    const render = () => renderer.render(scene, camera);

    const animate: AnimationTickFn = (dt, elapsedMs) => {
        const elapsed = elapsedMs * 0.001;
        camera.position.x = _cameraRad * Math.cos(elapsed * _rotationSpeed);
        camera.position.z = _cameraRad * Math.sin(elapsed * _rotationSpeed);
        camera.lookAt(new Vector3(0, 0, 0));

        render();
    };

    return {
        animate,
        setSize: createResizer({ camera, renderer, render }),
        destroy: () => {},
    };
};

export default create;
