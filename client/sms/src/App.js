import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { host } from './actions/video'
import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux';
import StartPage from './components/startPage'
import VideoPlayer from './components/videoPlayer'




var socket = socketIOClient("http://localhost:3005")
function App(props) {

  return (
    <BrowserRouter>
      <div className='app'>
        {/* <StartPage /> */}
        {<VideoPlayer />}

        {/* <Route to='/' component={StartPage} exact={true} /> */}
      </div >
    </BrowserRouter>
  )

}

const mapStateToProps = (state) => {
  return {
    isHost: state.videoPlyer.isHost
  }
}
connect(mapStateToProps)(App)

export { App, socket }