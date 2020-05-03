const { Session } = require("../models/session");
const validator = require("validator");

//sms/users/register
module.exports.createSession = function (req, res) {
  const body = req.body;
  const session = new Session(body);
  console.log("REGISTERRRRR =>", session);
  session
    .save()
    .then((session) => {
      console.log("REGISTERRRRR =>", session);
      res.json({
        room: session.room,
        id: session._id,
      });
    })
    .catch((err) => {
      res.status(406);
      res.send(err);
    });
};

module.exports.getSessionDetails = function (req, res) {
  const id = req.params.id;

  Session.findById(id)
    .then((session) => {
      console.log("GET DETAILS =>", session);
      res.send({
        room: session.room,
      });
    })
    .catch((err) => {
      res.status(406);
      res.send(err);
    });
};

module.exports.updateSessionDetails = function (req, res) {
  const id = req.params.id;
  const body = req.body;

  Session.findById(id)
    .then((session) => {
      const { video, users, currentPlayer } = body;
      if (video) {
        session.video.push(video);
      }
      if (users) {
        session.users.push(users);
      }
      if (currentPlayer) {
        session.currentPlayer = currentPlayer;
      }
      return session
        .save()
        .then((user) => {
          return Promise.resolve(session);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    })
    .catch((err) => Promise.reject(err));
};
