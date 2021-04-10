import * as Three from 'three';
import { AnimationTickFn, createResizer, ThreeAnimationFactory } from '~/modules/simple-three-setup';
import Star from './Star';

const COUNT = 5000;
const COLORS = [0x2f97c1, 0x2ab7ca, 0xfe5f55, 0x06d6a0, 0xf9c80e];

const factory: ThreeAnimationFactory = (canvas) => {
    const scene = new Three.Scene();
    scene.fog = new Three.Fog(0, 600, 1000);
    const camera = new Three.PerspectiveCamera();
    const renderer = new Three.WebGLRenderer({ canvas });

    const stars = Array(COUNT)
        .fill(0)
        .map((v, i) => new Star(i / COUNT));

    const geometry = new Three.BufferGeometry();
    const verts: number[] = [];
    const colors: number[] = [];

    stars.forEach((x, i) => {
        verts.push(...x.coords());
        const color = new Three.Color(COLORS[i % COLORS.length]);
        colors.push(color.r, color.g, color.b);
    });
    geometry.setAttribute('position', new Three.Float32BufferAttribute(verts, 3));
    geometry.setAttribute('color', new Three.Float32BufferAttribute(colors, 3));
    const material = new Three.PointsMaterial({
        size: 3,
        color: 0xffffff,
    });
    const points = new Three.Points(geometry, material);
    scene.add(points);
    camera.position.set(0, 0, 600);

    const render = () => renderer.render(scene, camera);

    const animate: AnimationTickFn = (dt) => {
        const t = dt * 0.001;
        const { position } = geometry.attributes;
        stars.forEach((x, i) => {
            x.animate(t);
            x.coords().forEach((value, j) => {
                ((position.array as unknown) as number[])[i * 3 + j] = value;
            });
        });
        position.needsUpdate = true;
        render();
    };

    return {
        animate,
        setSize: createResizer({ render, renderer, camera }),
    };
};

export default factory;
