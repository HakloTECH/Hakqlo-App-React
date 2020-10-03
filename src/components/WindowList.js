import React from 'react'
import AppWindow from './AppWindow'
import { Window1, Window2, Window3, Window4, Window5, Window6 } from './Windows'
import '../css/window.scss'


export default class extends React.Component {
  appWindows = [
    Window1,
    Window2,
    Window3,
    Window4,
    Window5,
    Window6,
  ]
  state = {
    currentWin: 0,
    scrollLength: 0,
    listView: false,
    scrolling: false,
  }

  componentDidMount() {
    let params = {}
    window.location.search.slice(1).split('&').forEach(value => {
      const param = value.split('=')
      params[param[0]] = param[1]
    })
    if (params.appWindow) this.setState({currentWin: Number(params.appWindow)})
  }

  scrollTo(moveLength) {
    let scrollLength = moveLength % this.appWindows.length
    if (scrollLength < 0) scrollLength += this.appWindows.length
    this.setState({scrollLength: scrollLength})
  }

  bringToCenter() {
    this.setState({scrollLength: Math.round(this.state.scrollLength)})
  }

  render() {
    return (
      <div className={
          'window-list ' +
          (this.state.scrolling ? 'scrolling' : '')
        }>
        {this.appWindows.map((component, index) =>
          <AppWindow winList={this} component={component} index={index} key={index} />
        )}
      </div>
    )
  }
}