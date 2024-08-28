import express from 'express'

const app = express()

app.get("/",(req,res)=>{
    res.json({message:"connected successfu"})
})

app.listen(3000,(err,req,res)=>{
    console.log("Runnun on http://localhost:3000")
})