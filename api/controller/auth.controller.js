import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'

const signup = async (req,res,next)=>{
    const {username,email,password} = req.body

    if(username=="" || email =="" || password==""){
        return res.status(500).json({error:'feilds cannot be empty'})
    }

    if (!/^[a-zA-Z0-9_]{5,15}$/.test(username)) {
      return res.status(500).json({error: 'Username must be 5-15 characters long and contain only letters, numbers, or underscores.'})
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(500).json({error:'Please enter a valid email address.'})
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        return res.status(500).json({error:'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.'})
    }

    
    try {

        bcrypt.hash(password,10,async(err,hash)=>{
            const newUser = new User({username,email,password:hash})
           try {
            await newUser.save().then(()=>{
                return res.status(200).json({message:newUser})
            })
           } catch (error) {
            next(error)
           }
        })
        
    } catch (error) {
        return res.status(500).json({err: error})
    }

}

export default signup;