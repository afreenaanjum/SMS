import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import {Container, Row, Col} from 'reactstrap'

import { BrowserRouter } from 'react-router-dom'
// import { host } from './actions/video'
import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux';
// import StartPage from './components/startPage'
import VideoPlayer from './components/videoPlayer'
import Chat from './components/Chat/Chat' 



var socket = socketIOClient("http://localhost:3005")
function App(props) {

  return (
    <BrowserRouter>
        <div className='app'>
          <NavBar />
          <Container>
            <Row style={{margin:"15px"}} />
            <Row>
              <Col sm="8" >
                <VideoPlayer />
              </Col>
              <Col sm="4" >
                <Chat />
              </Col>
            </Row>
          </Container>
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