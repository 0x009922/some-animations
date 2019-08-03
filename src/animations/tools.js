export function tween (...args) {
  if (args.length === 2) {
    let [[start, end], n] = args
    return n * (end - start) + start
  }
}

export function rgb (...args) {
  if (args.length === 1 && Array.isArray(args[0])) {
    return `rgb(${args[0].join(',')})`
  }
  if (args.length === 3) {
    return `rgb(${args.join(',')})`
  }
  return null
}
