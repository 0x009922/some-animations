import * as THREE from 'three';
import { ThreeAnimationFactory } from '~/modules/simple-three-setup';
import LegacyThreeAnimation, { Animatable } from '../../LegacyThreeAnimation';

const factory: ThreeAnimationFactory = (canvas) => {
    const anim = new Animation(canvas);

    return {
        setSize: anim.setSize.bind(anim),
        animate: anim.animate.bind(anim),
    };
};

export default factory;

class Animation extends LegacyThreeAnimation implements Animatable {
    private fixed: THREE.Font | null = null;

    private menlo: THREE.Font | null = null;

    private block: THREE.Mesh | null = null;

    // private center: THREE.Vector3 | null = null;

    public constructor(canvas: HTMLCanvasElement) {
        super();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });

        const fontLoader = new THREE.FontLoader();
        fontLoader.load(
            'fonts/Fixed_Medium.json',
            (font) => {
                this.fixed = font;
                this.initTextIfReady();
            },
            () => {},
            console.error,
        );
        fontLoader.load(
            'fonts/Menlo_Regular.json',
            (font) => {
                this.menlo = font;
                this.initTextIfReady();
            },
            () => {},
            console.error,
        );

        this.camera.position.set(3, -1, 10);
        this.camera.lookAt(1, -1, 0);
    }

    public animate(deltaMs: number, elapsedMs: number) {
        const el = elapsedMs * 0.001;
        this.updateBlockVisibility(el);
        this.render();
    }

    private updateBlockVisibility(elapsed: number) {
        if (!this.block) return;
        this.block.visible = elapsed % 1 < 0.5;
    }

    private initTextIfReady() {
        if (this.fixed && this.menlo) {
            this.initText();
        }
    }

    private initText() {
        const fontSize = 0.5;

        const basicGeo = new THREE.ShapeBufferGeometry(this.fixed!.generateShapes('Do you want to talk?', fontSize));
        basicGeo.computeBoundingBox();
        // this.center = basicGeo.boundingBox!.getCenter(new THREE.Vector3());
        const material = new THREE.MeshBasicMaterial({ color: 0x1e90ff });
        const basic = new THREE.Mesh(basicGeo, material);
        this.scene.add(basic);

        const blockGeo = new THREE.ShapeBufferGeometry(this.menlo!.generateShapes('\u2588', fontSize * 0.9));
        this.block = new THREE.Mesh(blockGeo, material);
        this.block.position.set(basic.geometry.boundingBox!.max.x, 0, 0);
        this.scene.add(this.block);
    }
}
