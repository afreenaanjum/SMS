const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../app/middlewares/authentification");

const userController = require("../app/controllers/user");
const sessionController = require("../app/controllers/session");

router.post("/sms/users/register", userController.register);
router.post("/sms/users/login", userController.login);
router.post(
  "/sms/users/sessions",
  authenticateUser,
  userController.addSessionDetails
);
router.get("/sms/users/account", authenticateUser, userController.account);
router.post("/sms/users/logout", authenticateUser, userController.logout);

router.post(
  "/sms/session/create",
  authenticateUser,
  sessionController.createSession
);
router.post(
  "/sms/session/:id",
  authenticateUser,
  sessionController.getSessionDetails
);
router.put(
  "/sms/session/:id",
  authenticateUser,
  sessionController.updateSessionDetails
);

module.exports = router;
