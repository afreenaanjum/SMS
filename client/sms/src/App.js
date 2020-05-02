import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import io from "socket.io-client";

import "./App.css";
import axios from "./config/axios";

// import VideoPlayer from "./components/VideoPlayer/videoPlayer";
// import Chat from "./components/Chat/Chat";
import StartPage from "./components/StartPage";
import Homepage from "./components/Homepage";
import ProtectedRoutes from "./ProtectedRoutes";
import SessionPage from "./components/SessionPage";
import { getAuthToken } from "./services/localStorage";
import { userDetails } from "./actions/userDetails";
import { useDispatch } from "react-redux";

// let port = process.env.PORT || 3005
const endpoint = "http://localhost:3005";

//Setting up sockets on client side
const socket = io(endpoint);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getAuthToken()) {
      axios
        .get("sms/users/account", { headers: { "x-auth": getAuthToken() } })
        .then((res) => {
          const userData = res.data;
          dispatch(
            userDetails({
              userName: userData.username,
              email: userData.email,
              mobile: userData.mobile,
            })
          );
        })
        .catch((err) => {
          console.log("Error getting user details", err);
        });
    }
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={StartPage} exact={true} />
        <ProtectedRoutes path="/homepage" Comp={Homepage} exact={true} />
        <ProtectedRoutes path="/session" Comp={SessionPage} exact={true} />
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isHost: state.videoPlayer.isHost,
  };
};

connect(mapStateToProps)(App);

export { App, socket };
