const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  sendMessageController,
  allMessages,
} = require("../controllers/messageControllers");

const routes = express.Router();

routes.route("/").post(protect, sendMessageController);
routes.route("/:chatId").get(protect, allMessages);

module.exports = routes;
