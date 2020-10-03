import React from 'react'
import Splash from './Splash'
import WindowList from './WindowList'
import Install from './Install'

class App extends React.Component {
  state = {
    isPWA: window.matchMedia('(display-mode: standalone)').matches
  }

  componentDidMount() {
    window.matchMedia('(display-mode: standalone)').addEventListener('change', e => {
      this.setState({
        isPWA: e.matches
      })
    })
  }

  render() {
    if (this.state.isPWA) {
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
}

export default App
