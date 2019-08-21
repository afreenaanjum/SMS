import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import socketIOClient from 'socket.io-client'
import ReactPlayer from 'react-player'
import Duration from './components/Duration'


var socket;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      playing: true,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      endpoint: "http://localhost:3005",
      isHost: false
    }
    socket = socketIOClient(this.state.endpoint)
  }


  componentDidMount() {
    //Listening to the new playing state
    socket.on('playState', (playState) => {
      this.setState({ playing: playState })
    })
    //When someone enters custom url and loads it, same URL is listened by all
    socket.on('updateURL', (url) => {
      this.setState({ url })
    })

    // When a new user joins to an existing session the URL is fetched by listening to the socket
    socket.on('newConnection', ({ url, playStateServer }) => {
      this.setState({ url: url, playing: playStateServer })
    })

    //Keeps in sync with host
    socket.on('sync', ({ played, url }) => {
      this.setState({ url })
      this.player.seekTo(played, 'fraction')
    })

  }

  playPause = () => {
    const currentState = !this.state.playing
    // If a user in the session is clicking on the playPause button the state is emitted to the server
    socket.emit('playPause', currentState)
    this.setState({ playing: !this.state.playing })
  }

  stop = () => {
    this.setState({ url: null, playing: false })
  }

  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  onProgress = state => {
    console.log('onProgress', state, this.state.seeking)

    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }

    if (this.state.isHost) {
      socket.emit('onProgress', state)
    }
  }
  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: false })
  }
  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  ref = player => {
    this.player = player
  }

  render() {
    const { url, playing, played, loaded, duration, playbackRate, isHost } = this.state
    const SEPARATOR = ' · '
    console.log('render', this.state)
    return (
      <div className='app'>
        <section className='section'>
          <h1>ReactPlayer Demo</h1>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              playing={playing}
              playbackRate={playbackRate}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.onEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>

          <table><tbody>
            <tr>
              <th>Controls</th>
              <td>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                <button onClick={this.onClickFullscreen}>Fullscreen</button>
              </td>
            </tr>
            {isHost && <tr>
              <th>Speed</th>
              <td>
                <button onClick={this.setPlaybackRate} value={1}>1x</button>
                <button onClick={this.setPlaybackRate} value={1.5}>1.5x</button>
                <button onClick={this.setPlaybackRate} value={2}>2x</button>
              </td>
            </tr>}
            <tr>
              <th>Seek</th>
              <td>
                < input
                  type='range' min={0} max={1} step='any'
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Custom URL</th>
              <td>
                <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                <button onClick=
                  {() => {
                    //Emitting the URL entered to the server
                    socket.emit('url', this.urlInput.value)
                    this.setState({ url: this.urlInput.value })
                  }}>Load</button>
              </td>
            </tr>
            <tr>
              <th>HOst</th>
              <td>
                <button onClick={() => {
                  this.setState({ isHost: true })
                }} >Host</button></td>
            </tr>
            <tr>
              <th>SYNC</th>
              <td>
                <button onClick={() => {
                  this.player.seekTo(this.state.played, "fraction")
                }}>Sync</button></td>
            </tr>
          </tbody></table>

          <h2>State</h2>

          <table><tbody>
            <tr>
              <th>url</th>
              <td className={!url ? 'faded' : ''}>
                {(url instanceof Array ? 'Multiple' : url) || 'null'}
              </td>
            </tr>
            <tr>
              <th>playing</th>
              <td>{playing ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>played</th>
              <td>{played.toFixed(3)}</td>
            </tr>
            <tr>
              <th>loaded</th>
              <td>{loaded.toFixed(3)}</td>
            </tr>
            <tr>
              <th>duration</th>
              <td><Duration seconds={duration} /></td>
            </tr>
            <tr>
              <th>elapsed</th>
              <td><Duration seconds={duration * played} /></td>
            </tr>
            <tr>
              <th>remaining</th>
              <td><Duration seconds={duration * (1 - played)} /></td>
            </tr>
          </tbody></table>
        </section>
      </div >
    )
  }
}

export default hot(module)(App)