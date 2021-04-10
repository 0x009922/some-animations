export function tween(...args: any[]): number {
    if (args.length === 2) {
        return args[1] * (args[0][1] - args[0][0]) + args[0][0];
    }
    if (args.length === 3) {
        return args[2] * (args[1] - args[0]) + args[0];
    }
    throw new TypeError(`Invalid arguments: ${args}`);
}

export function rgb(...args: any[]): string {
    if (args.length === 1 && Array.isArray(args[0])) {
        return `rgb(${args[0].join(',')})`;
    }
    if (args.length === 3) {
        return `rgb(${args.join(',')})`;
    }
    throw new TypeError(`Invalid arguments: ${args}`);
}

export function sum(...args: any[]) {
    const arr = Array.isArray(args[0]) ? args[0] : args;
    return arr.reduce((prev, val) => prev + val, 0);
}

export function random(): number;
export function random(to: number): number;
export function random(from: number, to: number): number;

export function random(...params: number[]) {
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

export function rgbByHex(hex: number) {
    return {
        r: hex >> 16,
        g: (hex & 0xff00) >> 8,
        b: hex & 0xff,
    };
}

// /**
//  * @param {Function} func
//  * @param {number} delay
//  */
// export function debounce(func, delay) {
//     let timer;
//     return function (...args) {
//         const self = this;
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             func.apply(self, args);
//         }, delay);
//     };
// }
