export const recurry = (fn) => {
  const recurriedFn = (...args) => {
    if (args.length >= fn.length) {
      args.length = fn.length

      return fn(...args.reverse())
    }

    return (...args2) => recurriedFn(...args.concat(args2))
  }

  return recurriedFn
}
