import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import io from 'socket.io-client'
import { connect } from 'react-redux';

//App components
import VideoPlayer from './components/VideoPlayer/videoPlayer'
import Chat from './components/Chat/Chat'
import StartPage from './components/StartPage'

//Style components
import NavBar from './components/NavBar'
import { Container, Row, Col } from 'reactstrap'

//let port = process.env.PORT || 3005

const endpoint = "http://localhost:3005"
//Setting up sockets on client side
const socket = io(endpoint)


function App(props) {
  console.log(props.loggedIn)
  return (
    <BrowserRouter>
    <StartPage />
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
    isHost: state.videoPlayer.isHost,
    loggedIn: state.userAuth.loggedIn
  }
}

connect(mapStateToProps)(App)

export { App, socket }