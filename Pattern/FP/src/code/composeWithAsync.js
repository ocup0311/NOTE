import * as R from 'ramda'

export const composeWithAsyncMix = R.composeWith((fn, previousResult) =>
  previousResult?.then ? previousResult.then(fn) : fn(previousResult)
)

export const composeWithAsync = R.composeWith(R.andThen)
