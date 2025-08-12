const express = require("express");
const authRoute = require("./routes/auth.routes")
const postRoute = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}));
module.exports = app;