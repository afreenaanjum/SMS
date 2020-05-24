const express = require("express");
const mongoose = require("./config/database");
const http = require("http");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
const router = require("./config/routes");
const {
  generateMessage,
} = require("./client/sms/src/components/Chat/GenerateMessage");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/sms/build")));
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(cors());
app.use(express.json());
app.use(express.static(publicDirectoryPath));

app.use("/", router);

/// {"roomName" : {
url: "";

/// }}

var currentSessionDetailsOfEveryRoom = {};
//   connectionCount = 0,
//   playStateServer = true,
//   playedTimeServer = 0; // URL server has the URL of the existing session
// let connectedUsers = [];
// let roomName = "";

io.on("connection", (socket) => {
  // connectedUsers = [...connectedUsers, socket.id];
  // connectionCount = connectionCount + 1;
  console.log("New WebSocket connection");

  socket.on("join", ({ roomId, isHost }) => {
    console.log("joinnnedd isHost ->", isHost, roomId);
    if (isHost)
      currentSessionDetailsOfEveryRoom[roomId] = {
        url: "",
        playingState: true,
        playedTime: 0,
      };
    socket.join(roomId);
    socket.to(roomId).emit("message", { text: "A new user has joined!" });
    console.log("onjoinnnnn", currentSessionDetailsOfEveryRoom[roomId]);
  });

  socket.on("message", ({ message, room }) => {
    console.log("server", message, generateMessage(message, socket.id));
    io.in(room).emit("message", generateMessage(message, socket.id));
  });

  socket.on("onClickPlayPause", (data) => {
    //Same playPause state is broadcasted to everyone in that socket
    const { currentPlayingState, roomId } = data;
    currentSessionDetailsOfEveryRoom[roomId][
      "playingState"
    ] = currentPlayingState;
    socket.to(roomId).emit("updatedPlayState", currentPlayingState);
  });

  socket.on("getPlayState", ({ roomId }) => {
    console.log(
      "getPlaystatetet deatils 0f all sessions",
      currentSessionDetailsOfEveryRoom
    );
    // This will keep the new users joining existing session updated with the URL
    if (Object.keys(currentSessionDetailsOfEveryRoom).length != 0)
      socket.to(roomId).emit("newConnection", {
        playStateServer:
          currentSessionDetailsOfEveryRoom[roomId]["playingState"],
        url: currentSessionDetailsOfEveryRoom[roomId]["url"],
      });
  });

  //It is listening only from host
  socket.on("onProgress", ({ state, roomId }) => {
    currentSessionDetailsOfEveryRoom[roomId]["playedTime"] = state.played;
    //If user pauses the video and host is still playing or viceversa, to sync it with the host we are doing this
    socket.to(roomId).emit("sync", {
      played: state.played,
      url: currentSessionDetailsOfEveryRoom[roomId]["url"],
    });
  });

  socket.on("url", ({ url, roomId }) => {
    currentSessionDetailsOfEveryRoom[roomId]["url"] = url;
    console.log(currentSessionDetailsOfEveryRoom[roomId]);
    //Same URL is broadcasted to everyone in that socket
    socket.to(roomId).emit("updateURL", url);
  });

  socket.on("onClickStop", ({ roomId }) => {
    console.log(
      "onClickSTop",
      roomId,
      currentSessionDetailsOfEveryRoom[roomId]
    );
    currentSessionDetailsOfEveryRoom[roomId]["url"] = null;
    currentSessionDetailsOfEveryRoom[roomId]["playingState"] = false;
    console.log(
      "on click stop butomn",
      currentSessionDetailsOfEveryRoom[roomId]
    );
    //Same URL is broadcasted to everyone in that socket
    socket
      .to(roomId)
      .emit("updateOnStopButton", { url: null, playingState: false });
  });

  socket.on("disconnect", () => {
    // connectionCount = connectionCount - 1;
    // connectedUsers = connectedUsers.filter((id) => {
    //   id !== socket.id;
    // });
    console.log("Disconnected");
    // if (connectionCount === 0) {
    //   // If there are no users in the session, on new connection again the URL is set to null
    //   urlServer = null;
    //   playedTimeServer = 0;
    //   playStateServer = true;
    // }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/sms/build/index.html"));
});

const port = process.env.PORT || 3005;

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
