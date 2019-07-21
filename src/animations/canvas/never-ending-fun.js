// const literals = {
//   N: [
//     '**   **',
//     '***  **',
//     '***  **',
//     '**** **',
//     '** ****',
//     '**  ***',
//     '**  ***',
//     '**   **'
//   ],
//   E: [
//     '******',
//     '******',
//     '**',
//     '******',
//     '******',
//     '**',
//     '******',
//     '******'
//   ],
//   V: [
//     '**     **',
//     ' **   **',
//     ' **   **',
//     ' *** ***',
//     '  ** **',
//     '  ** **',
//     '   ***',
//     '   ***'
//   ],
//   R: [
//     '******',
//     '*******',
//     '**   **',
//     '*******',
//     '******',
//     '**  **',
//     '**   **',
//     '**    **'
//   ],
//   D: [
//     '*****',
//     '******',
//     '**   **',
//     '**   **',
//     '**   **',
//     '**   **',
//     '******',
//     '*****'
//   ],
//   I: [
//     '**',
//     '**',
//     '**',
//     '**',
//     '**',
//     '**',
//     '**',
//     '**'
//   ],
//   G: [
//     '  ****',
//     ' ******',
//     '**   **',
//     '**',
//     '**  ***',
//     '**   **',
//     ' ******',
//     '  ****'
//   ],
//   F: [
//     '*****',
//     '*****',
//     '**',
//     '****',
//     '****',
//     '**',
//     '**',
//     '**'
//   ],
//   U: [
//     '**   **',
//     '**   **',
//     '**   **',
//     '**   **',
//     '**   **',
//     '**   **',
//     '*******',
//     ' *****'
//   ]
// }

const X_COUNT = 100
const Y_COUNT = 100
const WIDTH = 700
const HEIGHT = 700
const CELL_SIZE = 4 // Размер обычных ячеек
const LIGHT_CELL_SIZE = 4 // Размер подсчевенных ячеек
const COLOR = [0, 250, 208] // Акцентный цвет
const NOISE_NUM = 0.2 // Уровень шума
const NOISE_COUNT = 500 // Количество ячеек, которые обновляются каждый кадр
const BLINKING = false // true - есть нижнеее подчеркивание, false - нет

function drawFunc (context, cell) {
  let col = (cell.light) ? arrToRgb(COLOR) : cell.noiseColor
  context.fillStyle = col
  let s = cell.light ? LIGHT_CELL_SIZE : CELL_SIZE
  context.fillRect(cell.x, cell.y, s, s)
  context.fill()
}

function generateNoiseColor () {
  let ran = Math.random()
  return arrToRgb(COLOR.map((x) => (
    x * ran * NOISE_NUM
  )))
}

function arrToRgb (arr) {
  return 'rgb(' + arr.join(',') + ')'
}

function neverEndingFun (a, ax, ay) {
  let b = []
  /* NEVER */
  let [x, y] = [ax - 22, ay - 20]

  lit_N()
  fill()
  x += 9
  lit_E()
  fill()
  x += 7
  lit_V()
  fill()
  x += 10
  lit_E()
  fill()
  x += 8
  lit_R()
  fill()

  /* ENDING */
  x = ax - 24
  y += 16
  lit_E()
  fill()
  x += 8
  lit_N()
  fill()
  x += 9
  lit_D()
  fill()
  x += 9
  lit_I()
  fill()
  x += 4
  lit_N()
  fill()
  x += 9
  lit_G()
  fill()

  /* FUN */
  x = ax - 13
  y += 16
  lit_F()
  fill()
  x += 7
  lit_U()
  fill()
  x += 9
  lit_N()
  fill()
  x += 9

  let light = false
  const INTERVAL = 500
  if (BLINKING) {
    setTimeout(change, INTERVAL)
  }

  function change () {
    light = !light
    lit__()
    fillAndDraw(light)
    setTimeout(change, INTERVAL)
  }

  function fill (value = true) {
    for (let i = 0; i < b.length; i++) {
      a[x + b[i][0]][y + b[i][1]].light = value
    }
  }

  function fillAndDraw (value = true) {
    for (let i = 0; i < b.length; i++) {
      a[x + b[i][0]][y + b[i][1]].light = value
      drawFunc(cont, a[x + b[i][0]][y + b[i][1]])
    }
  }

  function lit_N () {
    b = []
    b.push([0, 0])
    b.push([0, 1])
    b.push([0, 2])
    b.push([0, 3])
    b.push([0, 4])
    b.push([0, 5])
    b.push([0, 6])
    b.push([0, 7])
    b.push([1, 0])
    b.push([1, 1])
    b.push([1, 2])
    b.push([1, 3])
    b.push([1, 4])
    b.push([1, 5])
    b.push([1, 6])
    b.push([1, 7])
    b.push([2, 1])
    b.push([2, 2])
    b.push([2, 3])
    b.push([3, 3])
    b.push([3, 4])
    b.push([4, 4])
    b.push([4, 5])
    b.push([4, 6])
    b.push([5, 0])
    b.push([5, 1])
    b.push([5, 2])
    b.push([5, 3])
    b.push([5, 4])
    b.push([5, 5])
    b.push([5, 6])
    b.push([5, 7])
    b.push([6, 0])
    b.push([6, 1])
    b.push([6, 2])
    b.push([6, 3])
    b.push([6, 4])
    b.push([6, 5])
    b.push([6, 6])
    b.push([6, 7])
  }
  function lit_E () {
    b = []
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          (i == 2 && j >= 2) ||
          (i == 5 && j >= 2)
        ) {
          continue
        }
        b.push([j, i])
      }
    }
  }
  function lit_V () {
    b = []
    b.push([0, 0])

    b.push([1, 0])
    b.push([1, 1])
    b.push([1, 2])
    b.push([1, 3])

    b.push([2, 1])
    b.push([2, 2])
    b.push([2, 3])
    b.push([2, 4])
    b.push([2, 5])

    b.push([3, 3])
    b.push([3, 4])
    b.push([3, 5])
    b.push([3, 6])
    b.push([3, 7])

    b.push([4, 6])
    b.push([4, 7])

    b = b.concat(
      b.filter((x) => x[0] < 4)
        .map(x => (
          [8 - x[0], x[1]]
        ))
    )
  }
  function lit_R () {
    lit_I()
    b.push([2, 0])
    b.push([3, 0])
    b.push([4, 0])
    b.push([5, 0])

    b.push([2, 1])
    b.push([3, 1])
    b.push([4, 1])
    b.push([5, 1])
    b.push([6, 1])

    b.push([5, 2])
    b.push([6, 2])

    b.push([2, 3])
    b.push([3, 3])
    b.push([4, 3])
    b.push([5, 3])
    b.push([6, 3])

    b.push([2, 4])
    b.push([3, 4])
    b.push([4, 4])
    b.push([5, 4])

    b.push([4, 5])
    b.push([5, 5])

    b.push([5, 6])
    b.push([6, 6])

    b.push([6, 7])
    b.push([7, 7])
  }
  function lit_D () {
    lit_I()
    b.push([2, 0])
    b.push([3, 0])
    b.push([4, 0])

    b.push([2, 1])
    b.push([3, 1])
    b.push([4, 1])
    b.push([5, 1])

    b.push([5, 2])
    b.push([6, 2])
    b.push([5, 3])
    b.push([6, 3])
    b.push([5, 4])
    b.push([6, 4])
    b.push([5, 5])
    b.push([6, 5])

    b.push([2, 6])
    b.push([3, 6])
    b.push([4, 6])
    b.push([5, 6])

    b.push([2, 7])
    b.push([3, 7])
    b.push([4, 7])
  }
  function lit_I () {
    b = []
    for (let i = 0; i < 8; i++) {
      b.push([0, i])
      b.push([1, i])
    }
  }
  function lit_G () {
    b = []

    b.push([2, 0])
    b.push([3, 0])
    b.push([4, 0])
    b.push([5, 0])

    b.push([1, 1])
    b.push([2, 1])
    b.push([3, 1])
    b.push([4, 1])
    b.push([5, 1])
    b.push([6, 1])

    b.push([0, 2])
    b.push([1, 2])
    b.push([5, 2])
    b.push([6, 2])

    b.push([0, 3])
    b.push([1, 3])

    b.push([0, 4])
    b.push([1, 4])
    b.push([4, 4])
    b.push([5, 4])
    b.push([6, 4])

    b.push([0, 5])
    b.push([1, 5])
    b.push([5, 5])
    b.push([6, 5])

    b.push([1, 6])
    b.push([2, 6])
    b.push([3, 6])
    b.push([4, 6])
    b.push([5, 6])
    b.push([6, 6])

    b.push([2, 7])
    b.push([3, 7])
    b.push([4, 7])
    b.push([5, 7])
  }
  function lit_F () {
    lit_I()

    b.push([2, 0])
    b.push([3, 0])
    b.push([4, 0])
    b.push([2, 1])
    b.push([3, 1])
    b.push([4, 1])

    b.push([2, 3])
    b.push([3, 3])
    b.push([2, 4])
    b.push([3, 4])
  }
  function lit_U () {
    b = []
    for (let i = 0; i < 7; i++) {
      b.push([0, i])
      b.push([1, i])
      b.push([5, i])
      b.push([6, i])
    }

    b.push([2, 6])
    b.push([3, 6])
    b.push([4, 6])

    b.push([1, 7])
    b.push([2, 7])
    b.push([3, 7])
    b.push([4, 7])
    b.push([5, 7])
  }
  function lit__ () {
    b = []

    for (let i = 0; i <= 6; i++) {
      b.push([i, 6])
      b.push([i, 7])
    }
  }
}

export default class Animation {
  constructor (canvas) {
    this.context = canvas.getContext('2d')
    this.cell = []

    this.context.beginPath()
    for (let i = 0; i < X_COUNT; i++) {
      let row = []
      for (let j = 0; j < Y_COUNT; j++) {
        let ob = {
          noiseColor: generateNoiseColor(),
          light: false,
          x: i * HEIGHT / Y_COUNT,
          y: j * WIDTH / X_COUNT
        }
        row.push(ob)
      }
      this.cell.push(row)
    }

    neverEndingFun(this.cell, 50, 50)

    for (let i = 0; i < X_COUNT; i++) {
      for (let j = 0; j < Y_COUNT; j++) {
        drawFunc(this.context, this.cell[i][j])
      }
    }
  }
  animate () {
    let n = NOISE_COUNT
    this.context.beginPath()
    while (n > 0) {
      let x = Math.floor(X_COUNT * Math.random())
      let y = Math.floor(Y_COUNT * Math.random())
      if (this.cell[x][y].light) {
        continue
      }
      n--
      this.cell[x][y].noiseColor = generateNoiseColor()
      drawFunc(this.context, this.cell[x][y])
    }
  }
}
