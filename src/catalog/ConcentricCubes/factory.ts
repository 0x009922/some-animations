import { AnimationTickFn, createResizer, ThreeAnimationFactory } from '@/modules/simple-three-setup';
import * as Three from 'three';

// Скорость вращения, в радианах
const ROTATION_SPEED = 1.1;

// Максимальный размер кубика
const MAX_SIZE = 1.2;

// Количество кубиков
const CUBES_COUNT = 10;

// Дистанция камеры от центра
const CAMERA_DISTANCE = 1.5;

// Поворот каждого кубика относительно предыдущего
const DELTA_ANGLE = 0.18;

interface CubeDef {
    size: number;
    angle: number;
}

/**
 * Рекурсивное формирование кубиков
 * @typedef {{ size: number, angle: number }} CubeDef
 * @param {number} count Сколько нужно сформировать
 * @param {number} lastSize Размер предыдущего кубика
 * @param {number} lastAngle Угол поворота предыдущего кубика
 * @param {CubeDef[]} cubes Куда класть результат
 * @returns {CubeDef[]}
 */
// eslint-disable-next-line max-params
function generateCubes(count: number, lastSize: number, lastAngle = 0, cubes: CubeDef[] = []): CubeDef[] {
    if (count <= 0) return cubes;
    const angle = lastAngle + DELTA_ANGLE;
    const size = (lastSize * 0.95) / (Math.sin(DELTA_ANGLE) + Math.cos(DELTA_ANGLE));
    cubes.push({ size, angle });
    return generateCubes(count - 1, size, angle, cubes);
}

const factory: ThreeAnimationFactory = (canvas) => {
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(65, 1, 0.1, 1000);
    const renderer = new Three.WebGLRenderer({
        canvas,
        antialias: true,
    });

    const material = new Three.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 2.5,
    });
    generateCubes(CUBES_COUNT, MAX_SIZE).forEach(({ size, angle }) => {
        const geometry = new Three.BoxGeometry(size, size, size);
        const edges = new Three.EdgesGeometry(geometry);
        const lines = new Three.LineSegments(edges, material);
        lines.rotateY(angle);
        scene.add(lines);
    });

    let viewAngle = 0;

    const render = () => renderer.render(scene, camera);

    const animate: AnimationTickFn = (delta) => {
        viewAngle += ROTATION_SPEED * delta * 0.001;
        camera.position.set(
            Math.cos(viewAngle) * CAMERA_DISTANCE,
            Math.cos(Math.PI / 4) * CAMERA_DISTANCE,
            Math.sin(viewAngle) * CAMERA_DISTANCE,
        );
        camera.lookAt(0, 0, 0);
        render();
    };

    return {
        animate,
        setSize: createResizer({ render, renderer, camera }),
    };
};

export default factory;
