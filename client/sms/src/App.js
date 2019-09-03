import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import io from 'socket.io-client'
import { connect } from 'react-redux';

//App components
import VideoPlayer from './components/VideoPlayer/videoPlayer'
import Chat from './components/Chat/Chat'

//Style components
import NavBar from './components/NavBar'
import { Container, Row, Col } from 'reactstrap'



//Setting up sockets on client side
const socket = io()

function App(props) {
  return (
    <BrowserRouter>
      <div className='app'>
        <NavBar />
        <Container>
          <Row style={{ margin: "15px" }} />
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
    isHost: state.videoPlayer.isHost
  }
}
connect(mapStateToProps)(App)

export { App, socket }