import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import io from 'socket.io-client'
import { connect } from 'react-redux';

//App components
import Homepage from './components/Homepage'
import SessionPage from './components/SessionPage'

//Style components
import NavBar from './components/NavBar'
import { Container, Row, Col } from 'reactstrap'



//Setting up sockets on client side
const socket = io('http://localhost:3005')

function App(props) {
  return (
    <BrowserRouter>
      <div className='app'>
        <Route path='/' component={Homepage} exact={true}/>
        <Route path='/sessions' component={SessionPage} exact={true} />
      </div >
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    isHost: state.videoPlayer.isHost
  }
}
connect(mapStateToProps)(App)

export { App, socket }