import React from "react";
import { connect } from "react-redux";
import { addUrl, host } from "../actions/video";
import NavBar from "./NavBar";
import { socket } from "../App";
import { getAuthToken } from "../services/localStorage";
import axios from "../config/axios";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      room: "",
      email: "",
      roomName: "",
    };
  }
  // handleChange(e){
  //     e.persist()
  //     this.setState({[e.target.name] : e.target.value})
  // }
  handleOnClickHost = () => {
    const { url, room } = this.state;
    const formData = {
      video: { url: url },
      room: room,
    };
    const headers = {
      "Content-Type": "application/json",
      "x-auth": getAuthToken()["token"],
    };
    axios
      .post("/sms/session/create", formData, { headers: headers })
      .then(
        (response) => {
          this.props.dispatch(host(true));
          this.props.history.push("/session");
        },
        (err) => alert(err.response.data.message)
      )
      .catch((errObject) => {
        alert(errObject);
      });
  };

  handleRoomName = (e) => {
    this.setState({
      roomName: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <h2>Short MeetUp Session</h2>

        <h4>Host Session</h4>
        <input
          type="text"
          name="url"
          placeholder="URL"
          ref={(input) => {
            this.urlInput = input;
          }}
          onChange={() => {
            this.props.dispatch(addUrl(this.urlInput.value));
          }}
        />
        <input
          type="text"
          placeholder="Room name"
          value={this.state.roomName}
          onChange={(e) => this.handleRoomName(e)}
        />
        <button onClick={this.handleOnClickHost}>Host</button>

        <h4>Join Session</h4>
        <input type="text" placeholder="email" value={this.state.email} />
        <input
          type="text"
          placeholder="Enter Room Name"
          value={this.state.roomName}
        />
        <button>Join</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.videoPlayer.url,
    isHost: state.videoPlayer.isHost,
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps)(Homepage);
