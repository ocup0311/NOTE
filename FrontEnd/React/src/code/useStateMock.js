// 此檔案模擬 useState 簡化版工作方式

let componentHooks = []
let currentHookIndex = 0

function useState(initialState) {
  let pair = componentHooks[currentHookIndex]

  // re-render
  if (pair) {
    currentHookIndex++
    return pair
  }

  // fist render
  pair = [initialState, setState]

  function setState(nextState) {
    pair[0] = nextState
    updateDOM()
  }

  componentHooks[currentHookIndex] = pair
  currentHookIndex++
  return pair
}

function MyComponent() {
  const [index, setIndex] = useState(0)
  const [showMore, setShowMore] = useState(false)

  function handleNextClick() {
    setIndex(index + 1)
  }

  function handleMoreClick() {
    setShowMore(!showMore)
  }

  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
  }
}

function updateDOM() {
  // 渲染前做歸零
  currentHookIndex = 0
  let output = MyComponent()

  nextButton.onclick = output.onNextClick
  moreButton.onclick = output.onMoreClick
  moreButton.textContent = output.more
}

let nextButton = document.getElementById('nextButton')
let moreButton = document.getElementById('moreButton')
let sculptureList = []

// 將當下的 state 更新到 UI
updateDOM()
