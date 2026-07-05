require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const interviewRouter = require('./routes/interview.route');
const razorpayRouter = require('./routes/razorpay.route')

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://codewithsonu678.github.io",
        "https://ai-interview-pro-iota.vercel.app",
        "https://aiinterviewpro.vercel.app",
        "https://ai-interview-pro-v16c.vercel.app"
    ],
    credentials:true
}))

//routes

app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);
app.use("/api/payment",razorpayRouter);

module.exports = app;
