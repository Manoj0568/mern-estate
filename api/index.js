import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './DB/dbConnect.js'
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import cors from 'cors'
dotenv.config()
const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE, PUT",
    credentials: true
}))
const port = process.env.PORT || 3000
app.use(express.json())
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server errror"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(port,(err,req,res)=>{
    dbConnect()
    console.log(`Runnun on http://localhost:${port}`)
})