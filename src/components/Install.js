import React from 'react'
import '../css/install.scss'

export default class extends React.Component {
  state = {
    installPrompt: null,
    installed: false,
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      this.setState({installPrompt: e})
    })
  }

  render() {
    return (
      <div className='install center-content'>
        <h1>Hakqlo</h1>
        {this.state.installPrompt ?
          <button
            onClick={() => {
              this.state.installPrompt.prompt()
              this.state.installPrompt.userChoice.then((choice) => {
                if (choice.outcome === 'accepted') {
                  this.setState({
                    installPrompt: null,
                    installed: true
                  })
                }
              })
            }}>
            インストール
          </button> : this.state.installed ?
          <p>インストールされました</p> :
          <p>この端末にはインストールできません</p>
        }
      </div>
    )
  }
}