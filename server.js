const express = require("express");
const dotenv = require("dotenv");

const connectToDB = require("./backend/config/db");
const colors = require("colors");

const userRoutes = require("./backend/routes/userRoutes");
const chatRoutes = require("./backend/routes/chatRoutes");
const messageRoutes = require("./backend/routes/messageRoutes");
const path = require("path");
const app = express();
app.use(express.json());

const data = require("./backend/data/data");
const {
  notFound,
  errorHandler,
} = require("./backend/middleware/errorMiddleware");

dotenv.config();

const PORT = process.env.PORT || 8001;

connectToDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//!-------- build start----------
// app.get("/", (req, res) => {
//   res.json({ hi: "hii" });
// });

const __dirName1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirName1, "/frontend/build")));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ hi: "hii" });
  });
}
// app.get("/", "./build/index.html");

//!-------- build end----------

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`.green);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000 " },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io ".red);
  socket.on("setup", (userData) => {
    socket.join(userData?._id);

    socket.emit("connected");
  });

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("user joined room ", room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived?.chat;

    if (!chat.users) {
      return console.log("chat.user not defined", newMessageReceived);
    }

    chat.users.forEach((user) => {
      if (user?._id === newMessageReceived?.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("typing", (rome) => {
    socket.in(rome).emit("typing");
  });
  socket.on("stop typing", (rome) => {
    socket.in(rome).emit("stop typing");
  });

  socket.off("setup", () => {
    socket.leave(userData?._id);
  });
});
