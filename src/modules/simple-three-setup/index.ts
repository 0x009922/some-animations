import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';

export type ResizeFn = (viewport: { width: number; height: number }) => void;

export type AnimationTickFn = (delta: number, elapsed: number) => void;

export interface ThreeAnimation {
    setSize: ResizeFn;
    destroy?: () => void;
    animate: AnimationTickFn;
}

export type ThreeAnimationFactory = (canvas: HTMLCanvasElement) => ThreeAnimation;

// export class Resizer {
//     protected camera: PerspectiveCamera;

//     protected renderer: WebGLRenderer;

//     protected renderFn: () => void;

//     public constructor({ camera, renderer, render }: {
//         camera: PerspectiveCamera;
//         renderer: WebGLRenderer;
//         render: () => void;
//     }) {

//     }

//     public resize({ width, height }: { width: number, height: number }) {
//         this.renderer.setSize(width, height);
//         this.camera.aspect = width / height;
//         this.camera.updateProjectionMatrix();
//         this.renderFn();
//     }
// }

export function createResizer({
    camera,
    renderer,
    render,
}: {
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    render: () => void;
}): ResizeFn {
    return ({ width, height }) => {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
    };
}

/**
 * Нахуя?
 */
export function createSimpleRenderFn({
    renderer,
    scene,
    camera,
}: {
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    scene: Scene;
}): () => void {
    return () => renderer.render(scene, camera);
}

// interface ThreeAnimationI {
//     new (canvas: HTMLCanvasElement)
//     setSize: (viewport: { width: number; height: number }) => void;
//     destroy: () => void;
//     animate: (delta: number, elapsed: number) => void;
// }

// class ThreeAnimationCreator<A extends ThreeAnimationI> {
//     protected factory: () => A;

//     public constructor(factory: () => A) {
//         this.factory = factory;
//     }

//     public create(canvas): A {
//         return this.factory();
//     }
// }

// export default class ThreeAnimation {
//     protected scene!: Scene;

//     protected renderer!: WebGLRenderer;

//     protected camera!: PerspectiveCamera;

//     // public constructor(params: { scene: Scene; renderer: WebGLRenderer; camera: PerspectiveCamera }) {
//     //     this.scene = params.scene;
//     //     this.renderer = params.renderer;
//     //     this.camera = params.camera;
//     // }

//     // eslint-disable-next-line @typescript-eslint/no-useless-constructor
//     public constructor(canvas: HTMLCanvasElement) {}

//     public setSize({ width, height }: { width: number; height: number }) {
//         if (!this.renderer || !this.camera) {
//             return;
//         }
//         this.renderer.setSize(width, height);
//         this.camera.aspect = width / height;
//         this.camera.updateProjectionMatrix();
//         this.render();
//     }

//     public destroy() {
//         // this.renderer.dispose();
//         // this.scene.traverse((x) => {
//         //     if ('geometry' in x) {
//         //         x.geometry.dispose();
//         //         // console.log('disposed geometry');
//         //     }
//         //     if ('material' in x) {
//         //         x.material.dispose();
//         //         // console.log('disposed material');
//         //     }
//         // });
//         // this.scene.dispose();
//     }

//     public render() {
//         this.renderer.render(this.scene, this.camera);
//     }

//     public animate(delta: number, elapsed: number): void {
//         throw new Error('This method is abstract');
//     }
// }
