export const pipe =
  (...fnArr) =>
  (x) =>
    fnArr.reduce((result, fn) => fn(result), x)
