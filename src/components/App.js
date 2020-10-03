import React from 'react'
import Splash from './Splash'
import WindowList from './WindowList'
import Install from './Install'

function App() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return (
      <div className='App'>
        <Splash />
        <WindowList />
      </div>
    )
  } else {
    return (
      <div className='App'>
        <Install />
      </div>
    )
  }
}

export default App
