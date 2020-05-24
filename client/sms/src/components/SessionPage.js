import React, { useEffect } from "react";
import { withRouter } from "react-router";

//App components
import VideoPlayer from "./VideoPlayer/videoPlayer";
import Chat from "./Chat/Chat";

//Style components
import NavBar from "./NavBar";
import { Container, Row, Col } from "reactstrap";
import { socket } from "../App";

function SessionPage(props) {
  useEffect(() => {
    console.log("useEffectttt", props);
    //For duplicating the tabs, the join event is emitted!
    socket.emit("join", {
      roomId: props.match.params.id,
      isHost: props.location.state ? props.location.state.isHost : false,
    });
  });
  return (
    <div>
      <NavBar />
      <Container>
        <Row style={{ margin: "15px" }} />
        <Row>
          <Col sm="8">
            <VideoPlayer />
          </Col>
          <Col sm="4">
            <Chat />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(SessionPage);
