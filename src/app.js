const express = require("express");
const authRoute = require("./routes/auth.routes")
const postRoute = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
module.exports = app;