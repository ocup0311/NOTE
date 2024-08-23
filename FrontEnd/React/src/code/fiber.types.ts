// 從這個原始碼簡化：https://github.com/facebook/react/blob/v18.0.0/packages/react-reconciler/src/ReactInternalTypes.js#L64-L193

type WorkTag = {}
type State = {}
type StateUpdaters = {}
type Dependencies = {}

export type Fiber = {
  // Tag identifying the type of fiber.
  tag: WorkTag

  // Unique identifier of this child.
  key: null | string

  // The resolved function/class/ associated with this fiber.
  type: any

  // Singly Linked List Tree Structure.
  child: Fiber | null
  sibling: Fiber | null
  index: number

  // Input is the data coming into this fiber (arguments/props)
  pendingProps: any
  memoizedProps: any // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: Array<State | StateUpdaters>

  // The state used to create the output
  memoizedState: any

  // Dependencies (contexts, events) for this fiber, if any
  dependencies: Dependencies | null
}
