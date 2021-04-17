import { useRafFn } from '@vueuse/core';
import {
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    Vector2,
    Vector3,
} from 'three';
import { TweenMax } from 'gsap';
import { onUnmounted, reactive, ref, watch, watchEffect } from 'vue';

interface TextureAtom {
    delay: number;
    type: 'stroke' | 'fill';
}

interface TextureAtomPositioned extends TextureAtom {
    pos: Vector2;
}

// function atom(delay: number): TextureAtom {
//     return { delay };
// }

const BIT_MAP = [
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 2, 2, 1],
    [1, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
    [1, 2, 1, 0, 0, 1, 2, 2, 1],
    [1, 1, 0, 0, 0, 0, 1, 2, 2, 1],
    [0, 0, 0, 0, 0, 0, 1, 2, 2, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1],
];

const TEXTURE: Array<Array<TextureAtom | null>> = BIT_MAP.map((row, rowNum) =>
    row.map((col, colNum) =>
        col === 0 ? null : { delay: (rowNum ** 2 + colNum ** 2) ** 0.5, type: col === 1 ? 'stroke' : 'fill' },
    ),
);

const BOX_SIZE = 0.02;
const GAP = 0;

const TEXTURE_FLATTEN = TEXTURE.reduce<TextureAtomPositioned[]>((prev, row, rowNum) => {
    row.forEach((col, colNum) => {
        if (!col) return;
        const pos = new Vector2(colNum, rowNum);
        prev.push({ ...col, pos });
    });
    return prev;
}, []);

const FACE_VERTICES_COUNT = 3;
const FACES_PER_CURSOR_ATOM = 2;
const VERTICE_COMPONENTS_COUNT = 3;
const ATOMS_COUNT = TEXTURE_FLATTEN.length;
const BUFFER_SIZE_PER_ATOM = FACES_PER_CURSOR_ATOM * FACE_VERTICES_COUNT * VERTICE_COMPONENTS_COUNT;
const BUFFER_SIZE = ATOMS_COUNT * BUFFER_SIZE_PER_ATOM;

function atomBufferOffsetByIndex(index: number): number {
    return BUFFER_SIZE_PER_ATOM * index;
}

/**
 * Параметры стрелки. Реактивные.
 */
export interface ArrowParams {
    /**
     * Где на плоскости её рисовать
     */
    position: Vector2;

    /**
     * Показывать ли её вообще? Обычно не надо показывать, если, например,
     * мышь ушла за пределы экрана или вообще мышь не используется
     */
    show: boolean;
}

/**
 * Создание объекта стрелки для сцены. При unmounted уничтожает ресурсы.
 */
export function useArrow(params: ArrowParams): Mesh {
    // watchEffect(() => {
    //     const { position } = params;
    //     console.log('position', { ...position });
    // });

    // watchEffect(() => {
    //     console.log('show', params.show);
    // });

    const geometry = new BufferGeometry();

    geometry.setAttribute('position', new BufferAttribute(new Float32Array(BUFFER_SIZE), VERTICE_COMPONENTS_COUNT));
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(BUFFER_SIZE), VERTICE_COMPONENTS_COUNT));
    const positionAttr = geometry.getAttribute('position');
    const colorAttr = geometry.getAttribute('color');

    const atoms = TEXTURE_FLATTEN.map(({ pos, ...rest }) => new CursorAtom({ ...pos, ...rest }));
    atoms.forEach((x, i) => x.writeColors(i, colorAttr.array as number[]));
    colorAttr.needsUpdate = true;

    const material = new MeshBasicMaterial({
        vertexColors: true,
        // opacity: 0.5,
        transparent: true,
        // color: 0xffffff,
        // wireframe: false,
        // wireframeLinewidth: 3,
        // wireframeLinejoin: 'round',
    });
    const arrow = new Mesh(geometry, material);

    function updateAtomsTarget(moveImmediately = false) {
        const { x, y } = params.position;
        const vec = new Vector2(x, y);
        atoms.forEach((atom, index) => {
            atom.updateTarget(vec, moveImmediately);
        });
    }

    // видно ли по-настоящему?
    const actualShow = ref(params.show);
    watch(
        () => params.show,
        (val) => {
            if (!val) {
                actualShow.value = false;
            }
        },
    );
    watch(
        params.position,
        () => {
            if (params.show) {
                updateAtomsTarget(!actualShow.value);
                actualShow.value = true;
            }
        },
        { deep: true, immediate: true },
    );

    // анимация прозрачности
    let fadeInOutTween: TweenMax | null = null;
    const fadeAnimatedData = reactive({
        opacity: actualShow.value ? 1 : 0,
        // z: actualShow.value ? 0 : -1,
    });
    // const opacity = ref(actualShow.value ? 1 : 0);
    // const meshZ = ref(actualShow.value ? 0 : -1);
    watchEffect(() => {
        material.opacity = fadeAnimatedData.opacity;
        // arrow.position.z = fadeAnimatedData.z;
    });
    watch(actualShow, (val) => {
        fadeInOutTween?.kill();
        fadeInOutTween = new TweenMax(fadeAnimatedData, {
            opacity: val ? 1 : 0,
            // z: val ? 0 : -1,
            duration: 0.3,
            ease: 'power3.out',
        });
    });
    onUnmounted(() => fadeInOutTween?.kill());

    // Обновление таргета частиц
    // watchEffect(() => {
    //     if (params.show) {
    //         const { x, y } = params.position;
    //         const vec = new Vector2(x, y);
    //         atoms.forEach((atom, index) => {
    //             atom.updateTarget(vec);
    //             // atom.writePositions(index, positionAttr.array as number[]);
    //         });
    //         resume();
    //     }
    //     // positionAttr.needsUpdate = true;
    //     // arrow.position.set(x, y, 0);
    // });

    // Анимирование движение частиц
    useRafFn(() => {
        if (fadeAnimatedData.opacity > 0) {
            atoms.forEach((atom, index) => {
                atom.moveToTarget(25);
                atom.writePositions(index, positionAttr.array as number[]);
            });
            positionAttr.needsUpdate = true;
        }
    });

    // watchEffect(() => {
    //     const { show } = params;
    //     // show ? resume() : pause();
    //     // arrow.visible = params.show;
    // });

    // watchEffect(() => {

    // });

    onUnmounted(() => {
        [geometry, material].forEach((x) => x.dispose());
    });

    return arrow;
}

class CursorAtom {
    private static INERTIA = 10;

    private vertices: Vector3[];

    private verticesReal: Vector3[] = [];

    private color: Color;

    private targetPos: Vector2 = new Vector2();

    private currentPos: Vector2 | null = null;

    private delay: number;

    public constructor(params: { x: number; y: number; delay: number; type: 'stroke' | 'fill' }) {
        this.delay = params.delay;

        const xRel = params.x * (BOX_SIZE + GAP);
        const yRel = -params.y * (BOX_SIZE + GAP);

        this.vertices = [
            [xRel, yRel, 0],
            [xRel + BOX_SIZE, yRel - BOX_SIZE, 0],
            [xRel + BOX_SIZE, yRel, 0],
            [xRel, yRel, 0],
            [xRel, yRel - BOX_SIZE, 0],
            [xRel + BOX_SIZE, yRel - BOX_SIZE, 0],
        ].map(([x, y, z]) => new Vector3(x, y, z));

        this.verticesReal = Array.from(new Array(this.vertices.length), () => new Vector3());

        this.color = new Color(params.type === 'fill' ? 0xffffff : 0);
    }

    public updateTarget(pos: Vector2, currentToo = false) {
        this.targetPos.copy(pos);
        if (!this.currentPos) {
            this.currentPos = new Vector2().copy(pos);
        } else if (currentToo) {
            this.currentPos.copy(pos);
        }

        // this.verticesReal.forEach((x, i) => {
        //     const v = this.vertices[i];
        //     x.set(v.x + pos.x, v.y + pos.y, v.z);
        // });
    }

    // public updateCurrentImmediately() {
    //     this.currentPos?.copy(this.targetPos);
    // }

    public moveToTarget(deltaMs: number) {
        if (!this.currentPos) throw new Error('No current pos');
        let k: number;

        if (this.delay === 0) {
            k = 1;
        } else {
            k = deltaMs * 0.001 * (50 / this.delay ** 0.9);
        }

        // const k = deltaMs * 0.001 * (CursorAtom.INERTIA / this.delay);
        this.currentPos.x += (this.targetPos.x - this.currentPos.x) * k;
        this.currentPos.y += (this.targetPos.y - this.currentPos.y) * k;
        this.updateRealVerticesByCurrentPos();
    }

    public writePositions(index: number, buffer: number[]) {
        const offset = atomBufferOffsetByIndex(index);

        let i = offset;
        for (const { x, y, z } of this.verticesReal) {
            buffer[i++] = x;
            buffer[i++] = y;
            buffer[i++] = z;
        }
    }

    public writeColors(index: number, buffer: number[]) {
        const { r, g, b } = this.color;
        const offset = atomBufferOffsetByIndex(index);
        for (let i = 0, j = offset; i < this.vertices.length; i += 1) {
            buffer[j++] = r;
            buffer[j++] = g;
            buffer[j++] = b;
        }
    }

    private updateRealVerticesByCurrentPos() {
        const { currentPos: pos } = this;
        if (!pos) throw new Error('No current pos');
        this.verticesReal.forEach((x, i) => {
            const v = this.vertices[i];
            x.set(v.x + pos.x, v.y + pos.y, v.z);
        });
    }
}
