import { rgb } from '@/utils';

const literals = {
  N: [
    '**   **',
    '***  **',
    '***  **',
    '**** **',
    '** ****',
    '**  ***',
    '**  ***',
    '**   **',
  ],
  E: [
    '******',
    '******',
    '**',
    '******',
    '******',
    '**',
    '******',
    '******',
  ],
  V: [
    '**     **',
    ' **   **',
    ' **   **',
    ' *** ***',
    '  ** **',
    '  ** **',
    '   ***',
    '   ***',
  ],
  R: [
    '******',
    '*******',
    '**   **',
    '*******',
    '******',
    '**  **',
    '**   **',
    '**    **',
  ],
  D: [
    '*****',
    '******',
    '**   **',
    '**   **',
    '**   **',
    '**   **',
    '******',
    '*****',
  ],
  I: [
    '**',
    '**',
    '**',
    '**',
    '**',
    '**',
    '**',
    '**',
  ],
  G: [
    '  ****',
    ' ******',
    '**   **',
    '**',
    '**  ***',
    '**   **',
    ' ******',
    '  ****',
  ],
  F: [
    '*****',
    '*****',
    '**',
    '****',
    '****',
    '**',
    '**',
    '**',
  ],
  U: [
    '**   **',
    '**   **',
    '**   **',
    '**   **',
    '**   **',
    '**   **',
    '*******',
    ' *****',
  ],
};

const X_COUNT = 100;
const Y_COUNT = 100;
const WIDTH = 700;
const HEIGHT = 700;
const CELL_SIZE = 4; // Размер обычных ячеек
const LIGHT_CELL_SIZE = 4; // Размер подсчевенных ячеек
const COLOR = [0, 250, 208]; // Акцентный цвет
const NOISE_NUM = 0.2; // Уровень шума
const NOISE_COUNT = 500; // Количество ячеек, которые обновляются каждый кадр

const noises = noiseGenerator();

function drawFunc(context, cell) {
  const col = (cell.light) ? rgb(COLOR) : cell.noiseColor;
  // console.log(col)
  context.fillStyle = col;
  const s = cell.light ? LIGHT_CELL_SIZE : CELL_SIZE;
  context.fillRect(cell.x, cell.y, s, s);
  context.fill();
}

function* noiseGenerator() {
  do {
    const ran = Math.random();
    yield rgb(COLOR.map((x) => x * ran * NOISE_NUM));
  } while (true);
}

function wordPositions(word, x0, y0) {
  const chars = word.toUpperCase().split('');
  let x = x0;
  const positions = [];
  chars.forEach((char) => {
    if (char === 'V') x -= 1;
    const data = literals[char];
    const longestLength = Math.max(...data.map((row) => row.length));
    data.forEach((cols, row) => {
      cols.split('').forEach((val, col) => {
        if (val !== ' ') positions.push([x + col, y0 + row]);
      });
    });
    x += longestLength + 2;
    if (char === 'V') x -= 1;
  });
  return positions;
}

function neverEndingFun() {
  const data = [
    ['NEVER', -22, -20],
    ['ENDING', -24, -4],
    ['FUN', -13, 12],
  ];
  return data.reduce((positions, [word, x, y]) => {
    positions.push(...wordPositions(word, x, y));
    return positions;
  }, []);
}

export default class Animation {
  constructor(canvas) {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;

    this.context = canvas.getContext('2d');
    this.cell = [];

    this.context.beginPath();

    const positions = neverEndingFun().map(([x, y]) => [x + 50, y + 50]);

    // console.log(positions)

    for (let i = 0; i < X_COUNT; i++) {
      const row = [];
      for (let j = 0; j < Y_COUNT; j++) {
        // let x = i * HEIGHT / Y_COUNT
        // let y = j * WIDTH / X_COUNT
        const cell = {
          noiseColor: noises.next().value,
          light: Boolean(positions.find(([x, y]) => x === i && y === j)),
          // light: false,
          x: i * HEIGHT / Y_COUNT,
          y: j * WIDTH / X_COUNT,
        };
        row.push(cell);
        drawFunc(this.context, cell);
      }
      this.cell.push(row);
    }
  }

  animate() {
    let n = NOISE_COUNT;
    this.context.beginPath();
    while (n > 0) {
      const x = Math.floor(X_COUNT * Math.random());
      const y = Math.floor(Y_COUNT * Math.random());
      if (this.cell[x][y].light) {
        continue;
      }
      n--;
      this.cell[x][y].noiseColor = noises.next().value;
      drawFunc(this.context, this.cell[x][y]);
    }
  }
}
