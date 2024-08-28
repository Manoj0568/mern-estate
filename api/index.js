import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './DB/dbConnect.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.get("/",(req,res)=>{
    res.json({message:"connected successfu"})
})

app.listen(port,(err,req,res)=>{
    dbConnect()
    console.log(`Runnun on http://localhost:${port}`)
})