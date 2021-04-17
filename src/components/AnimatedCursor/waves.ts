import { Color, Mesh, MeshBasicMaterial, RingGeometry, Scene, Vector2 } from 'three';
import { gsap, TimelineMax } from 'gsap';

const SIZE = 0.05;
const GAP = 0.05;
const VERTICE_COUNTS = [3, 4, 5, 6, 7, 9];
const COLORS = [0x3b60e4, 0xff4646, 0x28df99, 0x7579e7, 0xb9fffc, 0x50d890, 0xfddb3a, 0xbe9fe1, 0xc886e5, 0xff00c8];

const genRandomColor = gsap.utils.random(COLORS, true);

function genRing(ringIndexFromCenter: number, verticesCount: number) {
    const startRadius = ringIndexFromCenter * (SIZE + GAP);
    return new RingGeometry(startRadius, startRadius + SIZE, verticesCount);
}

const GEOMETRIES_BY_STEPS: { [vertices: number]: RingGeometry[] } = Object.fromEntries(
    VERTICE_COUNTS.map((count) => [count, Array.from(Array(5).keys()).map((i) => genRing(i, count))]),
);
const geometriesVertsRandom = gsap.utils.random(VERTICE_COUNTS, true);

function genRandomAngle() {
    return Math.PI * 2 * Math.random();
}

function getGeometriesList(): RingGeometry[] {
    return GEOMETRIES_BY_STEPS[geometriesVertsRandom()];
}

function genMaterial(color: Color | number) {
    return new MeshBasicMaterial({ color, transparent: true });
}

export function useWaves(
    scene: Scene,
): {
    start: (pos: Vector2) => void;
} {
    function start(pos: Vector2) {
        const rotation = genRandomAngle();
        const color = genRandomColor();
        // const material = pickRandomMaterial();

        const meshes = getGeometriesList().map((geom, i) => {
            const material = genMaterial(color);
            const mesh = new Mesh(geom, material);
            mesh.rotateZ(rotation);
            mesh.position.set(pos.x, pos.y, 0);
            return mesh;
        });

        scene.add(...meshes);

        function clear() {
            scene.remove(...meshes);
            meshes.forEach((x) => x.material.dispose());
        }

        const tl = new TimelineMax().addLabel('start');

        meshes.forEach((mesh, i) => {
            const meshTimeline = new TimelineMax()
                .addLabel('start')
                .fromTo(
                    mesh.material,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 0.1,
                        delay: i * 0.04,
                        ease: 'steps(1)',
                        // ease: 'power3.in'i,
                    },
                )
                .addLabel('appeared')
                .fromTo(
                    mesh.position,
                    { z: -0.5 },
                    {
                        z: -0.01,
                        duration: 0.5,
                        ease: 'power3.out',
                    },
                    '<',
                )
                .to(
                    mesh.material,
                    {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power3.inOut',
                    },
                    'appeared+=0.5',
                );

            tl.add(meshTimeline, 'start');
        });

        tl.eventCallback('onComplete', () => {
            clear();
        });
    }

    return { start };
}
