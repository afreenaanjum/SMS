import React from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import { socket } from "../../App";
import ReactPlayer from "react-player";
import Duration from "../Duration";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  playing,
  addUrl,
  played,
  duration,
  seeking,
  onprogress,
  host,
} from "../../actions/video";

//Icons
import { FaPlay, FaStop, FaPause, FaSyncAlt } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";

//Styles
import "./videoPlayer.css";
import {
  InputGroup,
  InputGroupAddon,
  Row,
  Button,
  Card,
  CardFooter,
} from "reactstrap";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.props.match.params.id,
    };
  }
  componentDidMount() {
    //On joining, get the current state
    socket.emit("getPlayState", { roomId: this.state.room });

    //Listening to the new playing state
    socket.on("updatedPlayState", (playState) => {
      this.props.dispatch(playing(playState));
    });

    //When someone enters custom url and loads it, same URL is listened by all
    socket.on("updateURL", (url) => {
      this.props.dispatch(addUrl(url));
    });

    // When a new user joins to an existing session the URL is fetched by listening to the socket
    socket.on("newConnection", ({ url, playStateServer }) => {
      this.props.dispatch(playing(playStateServer));
      this.props.dispatch(addUrl(url));
    });

    //Keeps in sync with host
    socket.on("sync", ({ played, url }) => {
      console.log("su=ynncpmponent did muount");
      this.props.dispatch(addUrl(url));
      this.player.seekTo(played, "fraction");
    });

    socket.on("updateOnStopButton", ({ playStateServer, url }) => {
      console.log("updtaeURLONSTOP", url);
      this.props.dispatch(addUrl(url));
      this.props.dispatch(playing(playStateServer));
    });
  }

  playPause = () => {
    const currentPlayingState = !this.props.playing;
    // If a user in the session is clicking on the playPause button the state is emitted to the server
    socket.emit("onClickPlayPause", {
      currentPlayingState,
      roomId: this.state.room,
    });
    this.props.dispatch(playing(currentPlayingState));
  };

  stop = () => {
    if (this.props.isHost)
      socket.emit("onClickStop", {
        roomId: this.state.room,
      });
    this.props.dispatch(addUrl(null));
    this.props.dispatch(playing(false));
  };

  onPlay = () => {
    console.log("onPlay");
    this.props.dispatch(playing(true));
  };

  onPause = () => {
    console.log("onPause");
    this.props.dispatch(playing(false));
  };

  onSeekMouseDown = (e) => {
    this.props.dispatch(seeking(true));
  };

  onSeekChange = (e) => {
    this.props.dispatch(played(parseFloat(e.target.value)));
  };

  onSeekMouseUp = (e) => {
    this.props.dispatch(seeking(false));
    this.player.seekTo(parseFloat(e.target.value));
  };

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.props.seeking) {
      this.props.dispatch(onprogress(state));
    }

    if (this.props.isHost) {
      // console.log("ishosttt", this.props.isHost, socket.id);
      socket.emit("onProgress", { state: state, roomId: this.state.room });
    }
  };
  onEnded = () => {
    console.log("onEnded");
    this.props.dispatch(playing(false));
  };

  onDuration = (durationTime) => {
    console.log("onDuration", durationTime);
    this.props.dispatch(duration(durationTime));
  };

  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };

  ref = (player) => {
    this.player = player;
  };

  render(props) {
    console.log("video render", this.props.url);
    return (
      <div className="app">
        <section>
          <Card
            style={{
              border: "none",
              backgroundColor: "#ebf1f4",
              padding: "null",
            }}
          >
            <div className="player-wrapper">
              <ReactPlayer
                // ref={this.ref}
                className="react-player"
                width="100%"
                height="100%"
                url={this.props.url}
                playing={this.props.playing}
                // playbackRate={this.props.playbackRate}
                onReady={() => console.log("onReady")}
                onStart={() => console.log("onStart")}
                onPlay={this.onPlay}
                onPause={this.onPause}
                onBuffer={() => console.log("onBuffer")}
                onSeek={(e) => console.log("onSeek", e)}
                onEnded={this.onEnded}
                onError={(e) => console.log("onError", e)}
                onProgress={this.onProgress}
                onDuration={this.onDuration}
              />
            </div>
            <CardFooter style={{ border: "none" }}>
              <Button color="none" onClick={this.stop}>
                <FaStop color="white" size="1em" />
              </Button>{" "}
              <Button color="none" onClick={this.playPause}>
                {this.props.playing ? (
                  <FaPause color="white" size="1em" />
                ) : (
                  <FaPlay color="white" size="1em" />
                )}
              </Button>{" "}
              <Button
                color="none"
                onClick={() => {
                  this.player.seekTo(this.props.played, "fraction");
                }}
              >
                <FaSyncAlt color="white" size="1em" />
              </Button>
              <Button color="none" onClick={this.onClickFullscreen}>
                <MdFullscreen color="white" size="1.5em" />
              </Button>
            </CardFooter>
          </Card>
          <Row style={{ margin: "5px" }} />
          <InputGroup>
            <input
              className="player-progress"
              type="range"
              min={0}
              max={1}
              step="any"
              value={this.props.played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
          </InputGroup>
          <InputGroup>
            <input
              ref={(input) => {
                this.urlInput = input;
              }}
              type="text"
              placeholder="Enter URL"
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={() => {
                  // console.log("ref play pause", this.urlInput.value);
                  //Emitting the URL entered to the server
                  socket.emit("url", {
                    url: this.urlInput.value,
                    roomId: this.state.room,
                  });
                  this.props.dispatch(addUrl(this.urlInput.value));
                }}
              >
                Load
              </Button>
              {/* <Button
                onClick={() => {
                  this.props.dispatch(host(true));
                }}
              >
                Host
              </Button> */}
            </InputGroupAddon>
          </InputGroup>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.videoPlayer.url,
    playing: state.videoPlayer.playing,
    played: state.videoPlayer.played,
    loaded: state.videoPlayer.loaded,
    duration: state.videoPlayer.duration,
    seeking: state.videoPlayer.seeking,
    isHost: state.videoPlayer.isHost,
  };
};

export default connect(mapStateToProps)(withRouter(VideoPlayer));
