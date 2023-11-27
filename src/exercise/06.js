// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

const formatDebugValue = ({query, state}) => `\`${query}\` => ${state}`

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)
  // 🐨 call React.useDebugValue here.
  // only to be used to label custom hooks, wouldn't work in a component
  // see it working using React dev tools
  // 💰 here's the formatted label I use: `\`${query}\` => ${state}`
  // passing the formatDebugValue function would make sense if it was doing some heavy expensive computation, this is not the case here, this is an overkill because we are creating an unneccessary object and passing and calling a function while what we want is just a simple string
  React.useDebugValue({query, state}, formatDebugValue)

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
