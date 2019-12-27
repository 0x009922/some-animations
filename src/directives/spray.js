const leashes = new Map();
const keys = keyGen();
const nextKey = () => keys.next().value;

function* keyGen() {
  let i = 0;
  while (++i > 0) {
    yield i.toString(36);
  }
}

function randomCount() {
  return ~~(Math.random() * 7) + 7;
}

class Dash {
  constructor(cx, cy, angle) {
    this.cx = cx;
    this.cy = cy;
    this.angle = angle;
    this.distance = 8 + Math.random() * 4;
    this.el = document.createElement('div');
    this.el.className = 'spray-dash';

    this.el.style.width = `${~~(Math.random() * 10) + 3}px`;
    this.el.style.animationName = 'spray-animation';

    this.takePos();
  }

  getEl() {
    return this.el;
  }

  takePos() {
    this.el.style.left = `${this.cx + Math.cos(this.angle) * this.distance}px`;
    this.el.style.top = `${this.cy + Math.sin(this.angle) * this.distance}px`;
    this.el.style.transform = `rotate(${this.angle}rad)`;
  }

  move() {
    this.distance += 10 + Math.random() * 10;
    this.takePos();
    // this.el.style.animationName = 'spray-animation'
  }
}

export default {
  bind(el, binding) {
    if (el.dataset.spray && leashes.has(el.dataset.spray)) return;

    const click = (e) => {
      window.requestAnimationFrame(() => {
        const { x, y } = e;
        const angle = Math.random() * Math.PI;
        const count = randomCount();
        const dashes = new Set(new Array(count).fill(0).map(
          (zero, i) => new Dash(x, y, angle + i * Math.PI * 2 / count),
        ));
        dashes.forEach((dash) => {
          el.appendChild(dash.getEl());
        });
        window.requestAnimationFrame(() => {
          dashes.forEach((dash) => {
            dash.move();
            dash.getEl().addEventListener('transitionend', () => {
              if (dashes.has(dash)) {
                el.removeChild(dash.getEl());
                dashes.delete(dash);
              }
            });
          });
        });
      });
    };

    el.addEventListener('click', click);
    const key = nextKey();
    leashes.set(key, click);
    el.dataset.spray = key;
  },
  unbind(el) {
    const key = el.dataset.spray;
    if (!key || !leashes.has(key)) return;
    el.removeEventListener('click', leashes.get(key));
  },
};
