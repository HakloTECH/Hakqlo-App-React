import React from 'react'
import Splash from './Splash'
import WindowList from './WindowList'
import Install from './Install'

function App() {
  const [isPWA, setIsPWA] = React.useState(window.matchMedia('(display-mode: standalone)').matches)

  if (isPWA) {
    return (
      <div className='App'>
        <Splash />
        <WindowList />
      </div>
    )
  } else {
    return (
      <div className='App'>
        <Install setIsPWA={setIsPWA} />
      </div>
    )
  }
}

export default App
