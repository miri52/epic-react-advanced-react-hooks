// // useContext: simple Counter
// // http://localhost:3000/isolated/exercise/03.js

// import * as React from 'react'

// // 🐨 create your CountContext here with React.createContext
// const CountContext = React.createContext()

// // 🐨 create a CountProvider component here that does this:
// //   🐨 get the count state and setCount updater with React.useState
// //   🐨 create a `value` array with count and setCount
// //   🐨 return your context provider with the value assigned to that array and forward all the other props
// //   💰 more specifically, we need the children prop forwarded to the context provider

// const CountProvider = props => {
//   const [count, setCount] = React.useState(0)
//   const value = [count, setCount]
//   return <CountContext.Provider value={value} {...props} />
// }

// function CountDisplay() {
//   // 🐨 get the count from useContext with the CountContext
//   const [count] = React.useContext(CountContext)
//   return <div>{`The current count is ${count}`}</div>
// }

// function Counter() {
//   // 🐨 get the setCount from useContext with the CountContext
//   const [, setCount] = React.useContext(CountContext)
//   const increment = () => setCount(c => c + 1)
//   return <button onClick={increment}>Increment count</button>
// }

// function App() {
//   return (
//     <div>
//       {/*
//         🐨 wrap these two components in the CountProvider so they can access
//         the CountContext value
//       */}
//       <CountProvider>
//         <CountDisplay />
//         <Counter />
//       </CountProvider>
//     </div>
//   )
// }

// export default App

// 1. EXTRA CREDIT SOLUTION - CONSUMER HOOK

import * as React from 'react'

// we could move all the context staff into a separate file and import it:
// import {CountProvider, useCount} from '../context/count-context'

const CountContext = React.createContext()

const CountProvider = props => {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within the CountProvider`)
  }
  return context
}

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
