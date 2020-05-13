export function tween(...args) {
  if (args.length === 2) {
    return args[1] * (args[0][1] - args[0][0]) + args[0][0];
  }
  if (args.length === 3) {
    return args[2] * (args[1] - args[0]) + args[0];
  }
  throw new TypeError('Invalid arguments:', args);
}


export function rgb(...args) {
  if (args.length === 1 && Array.isArray(args[0])) {
    return `rgb(${args[0].join(',')})`;
  }
  if (args.length === 3) {
    return `rgb(${args.join(',')})`;
  }
  throw new TypeError('Invalid arguments:', args);
}


export function sum(...args) {
  // if (Array.isArray(args[0])) {
  //   return args[0].reduce((sum, v) => sum + v, 0)
  // }
  if ('length' in args[0]) {
    let result = 0;
    for (let i = 0; i < args[0].length; i++) {
      result += args[0][i];
    }
    return result;
  }
  return args.reduce((prev, val) => prev + val, 0);
}


export function random(...params) {
  if (!params.length) return Math.random();
  let start = 0;
  let end = 1;
  if (params.length === 1) {
    [end] = params;
  }
  if (params.length === 2) {
    [start, end] = params;
  }
  return (end - start) * Math.random() + start;
}


export function rgbByHex(hex) {
  return {
    r: hex >> 16,
    g: (hex & 0xff00) >> 8,
    b: hex & 0xff,
  };
}

/**
 * @param {Function} func
 * @param {number} delay
 */
export function debounce(func, delay) {
  let timer;
  return function (...args) {
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
}
