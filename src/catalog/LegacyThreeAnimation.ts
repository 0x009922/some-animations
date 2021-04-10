import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

/**
 * Класс для того, чтобы сильно не перепиливать старые анимации. Пусть уж будут, какими были.
 */
export default class {
    public renderer!: WebGLRenderer;

    public camera!: PerspectiveCamera;

    public scene!: Scene;

    public setSize({ width, height }: { width: number; height: number }) {
        if (!this.renderer || !this.camera) {
            return;
        }
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.render();
    }

    public destroy() {
        this.renderer.dispose();
        // this.scene.traverse((x) => {
        //   if ('geometry' in x) {
        //     x.geometry.dispose();
        //     // console.log('disposed geometry');
        //   }
        //   if ('material' in x) {
        //     x.material.dispose();
        //     // console.log('disposed material');
        //   }
        // });
        // this.scene.dispose();
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }
}

export interface Animatable {
    animate: (deltaMs: number, elapsedMs: number) => void;
}
