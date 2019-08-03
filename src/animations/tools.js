export function tween (...args) {
  let n, start, end
  if (args.length === 2) {
    start = args[0][0]
    end = args[0][1]
    n = args[1]
  }
  if (args.length === 3) {
    start = args[0]
    end = args[1]
    n = args[2]
  }
  return n * (end - start) + start
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
