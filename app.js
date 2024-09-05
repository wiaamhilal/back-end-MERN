const express = require("express");
const connectToDb = require("./config/connectToDb");
const { notFound, errorHandler } = require("./models/error");
const cors = require("cors");
require("dotenv").config();
const xss = require("xss-clean");
const ratelimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

const app = express();

connectToDb();

// middlewares
app.use(express.json());

// prevet xss atacks
app.use(xss());

// rate linit
// app.use(
//   ratelimiting({
//     windowMs: 10 * 60 * 1000, // 10 munitse
//     max: 200,
//   })
// );

// security headers (helmet)
app.use(helmet());

// prevent http param polution
app.use(hpp());

//cors policy
app.use(
  cors({
    origin: "https://curious-caramel-dd0426.netlify.app/",
  })
);
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

// app.use(express.static("../front/build"));

// app.get("*", (req, res) => {
//   res.sendFile(`${__dirname}../front/build/index.html`);
// });

// error handler middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("port is running 8000"));
