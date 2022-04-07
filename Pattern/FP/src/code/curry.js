export const curry = (fn) => {
  const curriedFn = (...args) => {
    if (args.length >= fn.length) return fn(...args)
    return (...args2) => curriedFn(...args.concat(args2))
  }

  return curriedFn
}
