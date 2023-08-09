const express = require("express");
const dotenv = require("dotenv");

const connectToDB = require("./config/db");
const colors = require("colors");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");
const app = express();
app.use(express.json());

const data = require("./data/data");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const PORT = process.env.PORT || 8001;

connectToDB();

//!-------- build start----------
// app.get("/", (req, res) => {
//   res.json({ hi: "hii" });
// });

const __dirName1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirName1, "/frontend/build")));
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
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`.green);
});
