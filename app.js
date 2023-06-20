const express = require("express");
const app = express();
const PORT = 3000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const indexRouter = require("./src/routes/indexRouter");
const cookies = require("./src/middlewares/cookie");
const localsSession = require("./src/middlewares/session");

// Template engines
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "userTP",
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(localsSession);
app.use(cookies);

// Routes
app.use("/", indexRouter);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server Error");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});