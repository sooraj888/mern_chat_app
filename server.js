const express = require("express");
const dotenv = require("dotenv");

const connectToDB = require("./backend/config/db");
const colors = require("colors");

const userRoutes = require("./backend/routes/userRoutes");
const chatRoutes = require("./backend/routes/chatRoutes");
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

//!-------- build start----------
// app.get("/", (req, res) => {
//   res.json({ hi: "hii" });
// });

const __dirName1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirName1, "/frontend/build")));
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  console.log(__dirname);
  console.log(path.resolve("frontend", "build", "index.html").red);
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ hi: "hii" });
  });
}
// app.get("/", "./build/index.html");
//

//!-------- build end----------

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`.green);
});
