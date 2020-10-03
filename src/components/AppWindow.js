import React from 'react'

export default class extends React.Component {
  listCover = React.createRef()
  state = {
    scrollXStart: 0,
    WLScrollXStart: 0,
    isTouching: false,
  }

  componentDidMount() {
    const winList = this.props.winList
    const listCover = this.listCover.current

    listCover.addEventListener('touchstart', e => {
      if (!this.state.isTouching) {
        this.setState({
          scrollXStart: e.changedTouches[0].pageX*1.5/window.screen.width,
          WLScrollXStart: winList.state.scrollLength,
          isTouching: true,
        })
        winList.setState({scrolling: true})
      }
    }, {passive: false})
    listCover.addEventListener('touchmove', e => {
      if (this.state.isTouching) {
        e.preventDefault()
        const moveLength = this.state.scrollXStart-e.changedTouches[0].pageX*1.5/window.screen.width+this.state.WLScrollXStart
        if (winList.appWindows.length === 1 && (moveLength > 0.4 || moveLength < -0.4)) return 0
        winList.scrollTo(moveLength)
      }
    }, {passive: false})
    listCover.addEventListener('touchend', e => {
      this.setState({isTouching: false})
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
            transform: `scale(0.6, 0.6) translateZ(${Math.cos(wAngle)*15+60}px) translateX(${Math.sin(wAngle) * 50}%)`,
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