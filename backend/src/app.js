require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const interviewRouter = require('./routes/interview.route');

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://codewithsonu678.github.io/AI-Interview-Pro/",
    credentials:true
}))

//routes

app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);

module.exports = app;
