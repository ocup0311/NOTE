export const compose =
  (...fnArr) =>
  (x) =>
    fnArr.reduceRight((result, fn) => fn(result), x)
