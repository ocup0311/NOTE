
const neststate=  {
    user: {
      profile: {
        name: 'John Doe',
        age: 30,
      },
      preferences: {
        theme: 'dark',
      },
    },
  }



const [state, setState] = useState({
  0: {
    id: 0,
    title: 'user',
    childIds: [1, 2],
  },
  1: {
    id: 1,
    title: 'profile',
    name: 'John Doe',
    age: 30,
    childIds: [],
  },
  2: {
    id: 2,
    title: 'preferences',
    theme: 'dark',
    childIds: [],
  },
})

<Component1 state1={state[1]} />
<Component2 state2={state[2]} />