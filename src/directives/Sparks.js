const sparksSymbol = Symbol('sparks-directive-listener');

function randomCount() {
  return ~~(Math.random() * 7) + 7;
}

class Dash {
  constructor(cx, cy, angle, color = 'primary') {
    this.cx = cx;
    this.cy = cy;
    this.angle = angle;
    this.distance = 8 + Math.random() * 4;
    this.el = document.createElement('div');
    this.el.className = 'v-spark-dash';
    this.el.classList.add('v-spark-dash', `v-spark-dash--${color}`);

    this.el.style.width = `${~~(Math.random() * 10) + 3}px`;
    this.el.style.animationName = 'sparkDashAnimation';

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

/**
 * Из под курсора при клике на привязанном элементе
 * будут появляться искры цвета $primary
 */
export default {
  bind(el, binding) {
    const color = binding.value || 'primary';

    const listener = (e) => {
      window.requestAnimationFrame(() => {
        const { x, y } = e;
        const angle = Math.random() * Math.PI;
        const count = randomCount();
        const dashes = new Set(new Array(count).fill(0).map(
          (_, i) => new Dash(x, y, angle + i * Math.PI * 2 / count, color),
        ));
        dashes.forEach((dash) => {
          document.body.appendChild(dash.getEl());
        });
        window.requestAnimationFrame(() => {
          dashes.forEach((dash) => {
            dash.move();
            dash.getEl().addEventListener('transitionend', () => {
              if (dashes.has(dash)) {
                document.body.removeChild(dash.getEl());
                dashes.delete(dash);
              }
            });
          });
        });
      });
    };

    el.addEventListener('mousedown', listener);
    el[sparksSymbol] = listener;
  },
  unbind(el) {
    el.removeEventListener('mousedown', el[sparksSymbol]);
  },
};
