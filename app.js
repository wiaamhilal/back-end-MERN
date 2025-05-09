const express = require("express");
const connectToDb = require("./config/connectToDb");
const requistsSender = require("./config/requistsSender");
const { notFound, errorHandler } = require("./models/error");
const cors = require("cors");
require("dotenv").config();
const xss = require("xss-clean");
const ratelimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require("path");

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
// app.use(
//   cors({
//     origin: ["https://frontend-mern-eclz.onrender.com"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
app.use(cors({ origin: true }));

// Serve static files from the React app or other front-end framework
// app.use(express.static(path.join(__dirname, "build")));

// Catch-all handler to return index.html for all routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack); // سجل تتبع الخطأ
//   res.status(500).send({ message: "حدث خطأ في الخادم" });
// });

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/password", require("./routes/passwordRoute"));
app.use("/api/orders", require("./routes/orders"));

// app.use(express.static("../front/build"));

// app.get("*", (req, res) => {
//   res.sendFile(`${__dirname}../front/build/index.html`);
// });

// error handler middleware
app.use(notFound);
app.use(errorHandler);

const https = require("https");

setInterval(() => {
  https
    .get("https://back-end-mern-1-c5va.onrender.com", (res) => {
      console.log(`Status Code: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
    });
}, 600000); // Ping every 10 minutes

// translate the website
const translate = require("google-translate-api-x");

const translateRoutes = require("./routes/translate");
app.use("/api/translate", translateRoutes);

app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang)
      return res.status(400).json({ error: "Missing parameters" });

    const result = await translate(text, { to: targetLang });
    res.json({ translatedText: result.text });
  } catch (error) {
    console.error("Translation error:", error);
    res
      .status(500)
      .json({ error: "Translation failed", details: error.message });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("port is running 8000"));
