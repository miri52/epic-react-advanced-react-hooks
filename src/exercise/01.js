// useReducer: simple Counter
// a really good theory source, including an example https://react.dev/learn/extracting-state-logic-into-a-reducer
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// first argument is the current value of the count
// second argument is the action. Action is whatever is passed to the updater/dispatch function - changeCount (often also called dispatch). Whatever is passed to this dispatch function will be the second argument of the reducer.

// function countReducer(prevCount, newCount) {
//   return newCount
// }
// function Counter({initialCount = 0, step = 1}) {
//   // 🐨 replace React.useState with React.useReducer.
//   // 💰 React.useReducer(countReducer, initialCount)
//   // const [count, setCount] = React.useState(initialCount)
//   const [count, setCount] = React.useReducer(countReducer, initialCount)

//   // 💰 you can write the countReducer function so you don't have to make any
//   // changes to the next two lines of code! Remember:
//   // The 1st argument is called "state" - the current value of count
//   // The 2nd argument is called "newState" - the value passed to setCount
//   const increment = () => setCount(count + step)
//   return <button onClick={increment}>{count}</button>
// }

// 1. EXTRA CREDIT - accept the step as action (we can pass anything as the action)

// const countReducer = (prevCount, step) => prevCount + step

// function Counter({initialCount = 0, step = 1}) {
//   const [count, changeCount] = React.useReducer(countReducer, initialCount)
//   const increment = () => changeCount(step)
//   return <button onClick={increment}>{count}</button>
// }

// 2. EXTRA CREDIT - simulate setState with an object

// const countReducer = (state, action) => ({...state, ...action})

// function Counter({initialCount = 0, step = 1}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () => setState({count: count + step})
//   return <button onClick={increment}>{count}</button>
// }

// 3. EXTRA CREDIT - simulate setState with an object or a callback function
// supporting only the function would look like this:
// const countReducer = (state, action) => action(state)
// supoorting both means that we will still always return an object, so we use spread for both returns

// const countReducer = (state, action) => ({
//   ...state,
//   ...(typeof action === 'function' ? action(state) : action),
// })

// function Counter({initialCount = 0, step = 1}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () =>
//     setState(currentState => ({count: currentState.count + step}))
//   return <button onClick={increment}>{count}</button>
// }

// 4. EXTRA CREDIT - tranditional DISPATCH object with a type and a switch statement
// the most conventional way, mostly thanks to redux
// especially handy if the reducer gets more complex -> easier to maintain, e.g if we add more cases such as 'decrement' etc.

function countReducer(state, action) {
  const {type, step} = action
  switch (type) {
    case 'INCREMENT': {
      return {...state, count: state.count + step}
    }
    case 'DECREMENT': {
      return {...state, count: state.count - step}
    }
    default: {
      throw new Error('Unknown action: ' + type)
    }
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state

  const increment = () => dispatch({type: 'INCREMENT', step})
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
