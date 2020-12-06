import * as THREE from 'three';
import { Pass } from './Pass';
import { FilmShader } from '../shaders/FilmShader';

export function FilmPass(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {
    Pass.call(this);

    if (FilmShader === undefined) {
        console.error('THREE.FilmPass relies on THREE.FilmShader');
    }

    const shader = FilmShader;

    this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
    });

    if (grayscale !== undefined) this.uniforms.grayscale.value = grayscale;
    if (noiseIntensity !== undefined) this.uniforms.nIntensity.value = noiseIntensity;
    if (scanlinesIntensity !== undefined) this.uniforms.sIntensity.value = scanlinesIntensity;
    if (scanlinesCount !== undefined) this.uniforms.sCount.value = scanlinesCount;

    this.fsQuad = new Pass.FullScreenQuad(this.material);
}

FilmPass.prototype = Object.assign(Object.create(Pass.prototype), {
    constructor: FilmPass,

    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        this.uniforms.tDiffuse.value = readBuffer.texture;
        this.uniforms.time.value += deltaTime;

        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear) renderer.clear();
            this.fsQuad.render(renderer);
        }
    },
});
