import * as THREE from 'three';
import Animation from '@/utils/ThreeAnimation';

export default class extends Animation {
    constructor(canvas) {
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
                if (this.menlo) {
                    this.initText();
                }
            },
            null,
            console.error,
        );
        fontLoader.load(
            'fonts/Menlo_Regular.json',
            (font) => {
                this.menlo = font;
                if (this.fixed) {
                    this.initText();
                }
            },
            null,
            console.error,
        );

        this.camera.position.set(3, -1, 10);
        this.camera.lookAt(1, -1, 0);
    }

    animate(delta, elapsed) {
        const el = elapsed * 0.001;
        this.updateBlockVisibility(el);
        this.render();
    }

    updateBlockVisibility(elapsed) {
        if (!this.block) return;
        this.block.visible = elapsed % 1 < 0.5;
    }

    initText() {
        const fontSize = 0.5;

        const basicGeo = new THREE.ShapeBufferGeometry(this.fixed.generateShapes('Do you want to talk?', fontSize));
        basicGeo.computeBoundingBox();
        this.center = basicGeo.boundingBox.getCenter(new THREE.Vector3());
        const material = new THREE.MeshBasicMaterial({ color: 0x1e90ff });
        const basic = new THREE.Mesh(basicGeo, material);
        this.scene.add(basic);

        const blockGeo = new THREE.ShapeBufferGeometry(this.menlo.generateShapes('\u2588', fontSize * 0.9));
        this.block = new THREE.Mesh(blockGeo, material);
        this.block.position.set(basic.geometry.boundingBox.max.x, 0, 0);
        this.scene.add(this.block);
    }
}
