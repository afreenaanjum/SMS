import React from 'react'


//App components
import VideoPlayer from './VideoPlayer/videoPlayer'
import Chat from './Chat/Chat'


//Style components
import NavBar from './NavBar'
import { Container, Row, Col } from 'reactstrap'



function SessionPage(props) {
  return (
      <div>
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
  )
}

export default SessionPage