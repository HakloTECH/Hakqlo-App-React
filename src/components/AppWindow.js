import React from 'react'

export default class extends React.Component {
  listCover = React.createRef()
  WSR = 0.6
  WXR = 50
  state = {
    scrollXStart: 0,
    WLScrollXStart: 0,
    scrollRatio: 100/window.screen.width/this.WSR/this.WXR,
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({scrollRatio: 100/window.screen.width/this.WSR/this.WXR})
    })
    
    const winList = this.props.winList
    const listCover = this.listCover.current

    listCover.addEventListener('touchstart', e => {
      this.setState({
        scrollXStart: e.changedTouches[0].screenX*this.state.scrollRatio,
        WLScrollXStart: winList.state.scrollLength
      })
      winList.setState({scrolling: true})
    }, {passive: false})
    listCover.addEventListener('touchmove', e => {
      e.preventDefault()
      const moveLength = this.state.scrollXStart-e.changedTouches[0].screenX*this.state.scrollRatio+this.state.WLScrollXStart
      if (winList.appWindows.length === 1 && (moveLength > 0.4 || moveLength < -0.4)) return 0
      winList.scrollTo(moveLength)
    }, {passive: false})
    listCover.addEventListener('touchend', e => {
      winList.setState({scrolling: false})
      winList.bringToCenter()
    }, {passive: false})
    listCover.addEventListener('click', e => {
      winList.setState({
        currentWin: this.props.index,
        listView: false
      })
    }, {passive: false})
  }

  getDistanceFromCenter(index, center, listLength) {
    const b_distance = index - center
    if (Math.abs(b_distance) > Math.abs(b_distance+listLength)) return b_distance+listLength
    if (Math.abs(b_distance) > Math.abs(b_distance-listLength)) return b_distance-listLength
    return b_distance;
  }

  render() {
    const winList = this.props.winList
    const isListView = winList.state.listView
    const isFocused = winList.state.currentWin === this.props.index
    const distanceFromCenter = this.getDistanceFromCenter(this.props.index, winList.state.scrollLength, winList.appWindows.length)
    let wAngle = distanceFromCenter*Math.PI*3/4
    if (Math.abs(wAngle)>Math.PI) wAngle = Math.PI
    
    return (
      <div
        className={
          'app-window ' +
          (!isListView ? (isFocused ? 'focus' : 'away') : '')
        }
        style={
          isListView ? {
            transform: `scale(${this.WSR}, ${this.WSR}) translateZ(${Math.cos(wAngle)*15+60}px) translateX(${Math.sin(wAngle) * this.WXR}%)`,
            opacity: Math.cos(wAngle) > -1/2**0.5 ? (Math.cos(wAngle)+1/2**0.5)/(2+2/2**0.5)+0.5 : (Math.cos(wAngle)+1/2**0.5)/(3**0.5-2/2**0.5)+0.5
          } : null
        }>
        <div
          className='list-cover'
          ref={this.listCover}></div>
        <this.props.component winList={winList} />
      </div>
    )
  }
}