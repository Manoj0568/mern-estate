import mongoose from 'mongoose'

const schema = mongoose.Schema

const userSchema = new schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://i.pravatar.cc/300"
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)