/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import CanvasScene from '@/utils/CanvasScene';
import { tween, rgb } from '@/utils';

const _starsCount = 4000;
const _radius = 750;
const _starSize = 2;

const _energySpeed1 = 0.2;
const _energySpeed2 = 1.7;
const _energyAS1 = 0.7;
const _energyAS2 = 1;

const _radSpeedNum = 0.3;
const _radSpeedNum2 = 1.1;
const _angleSpeed = 1;
const _radMinSpeed = 10;

export default class extends CanvasScene {
    constructor(canvas) {
        super(canvas);
        this.galaxy = new Galaxy();
    }

    render(delta) {
        super.render();
        this.galaxy.render(this.context, delta * 0.001);
    }
}

class Galaxy {
    constructor() {
        this.stars = [];
        for (let i = 0; i < _starsCount; i++) {
            this.stars.push(new Star(i / _starsCount));
        }
    }

    render(context, t) {
        context.translate(500, 500);
        this.stars.forEach((x) => x.render(context, t));
        context.translate(-500, -500);
    }
}

class Star {
    constructor(energy) {
        this.vre = tween(_energySpeed1, _energySpeed2, energy);
        this.vae = tween(_energyAS1, _energyAS2, energy);
        this.a = Math.random() * Math.PI * 2;
        this.r = Math.random() * _radius;
        this.vr = 0;
        this.va = 0;
        this.energy = energy;
        this.setColor();
        this.appeared = false;
    }

    render(context, t) {
        this.vr = this.r ** _radSpeedNum2 * _radSpeedNum;
        this.vr = this.vr < _radMinSpeed ? -_radMinSpeed : -this.vr;
        this.r += this.vr * t * this.vre;
        this.a += this.va * t * this.vae;
        if (this.r <= 0) {
            this.reset();
        }
        if (!this.appeared) return;
        context.fillStyle = this.color;
        context.fillRect(
            Math.floor(this.r * Math.cos(this.a)),
            Math.floor(this.r * Math.sin(this.a)),
            _starSize,
            _starSize,
        );
    }

    reset() {
        this.a = Math.random() * Math.PI * 2;
        this.r = _radius;
        this.vr = 0;
        this.va = _angleSpeed;
        this.appeared = true;
    }

    setColor() {
        const n = Math.floor(this.energy ** 0.7 * 255);
        this.color = rgb(n, n, n);
    }
}
