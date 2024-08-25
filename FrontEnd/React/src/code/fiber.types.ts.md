#### 從這個[原始碼](https://github.com/facebook/react/blob/v18.0.0/packages/react-reconciler/src/ReactInternalTypes.js#L64-L193)簡化

```ts
export type Fiber = {
  // Tag identifying the type of fiber.
  tag: WorkTag

  // Unique identifier of this child.
  key: null | string

  // The resolved function/class/ associated with this fiber.
  type: any

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null

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
```
