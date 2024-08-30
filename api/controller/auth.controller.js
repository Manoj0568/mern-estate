import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { errorHandling } from "../utils/error.js"
import jwt from 'jsonwebtoken'
export const signup = async (req,res,next)=>{
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

export const signin = async (req,res,next) =>{
   const {email,password} = req.body
   if(email =="" || password==""){
    return res.status(500).json({error:'feilds cannot be empty'})
   }
   try {
     const foundUser =  await User.findOne({email})
     if(!foundUser) return next(errorHandling(404,"user not found"))
    
        bcrypt.compare(password,foundUser.password,(err,result)=>{
            if(result==true){
                const token = jwt.sign({id:foundUser._id},process.env.JWT_SECRET_KEY,{expiresIn: 1000 * 60 * 30 })
                const {password:pass, ...rest} = foundUser._doc
                res.cookie('authToken', token, {
                    expires: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
                    httpOnly: true, // Prevents JavaScript access to the cookie
                    sameSite: 'Lax', 
                    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                  });
              return res.status(200).json(rest)
            }else{
                return next(errorHandling(400,"username or password not matching"))
            }
        })
     
   } catch (error) {
     next(error)
   }
}

export const googleAuth = async (req,res,next)=>{
    const {email,name,photo} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn: 1000 * 60 * 30 })
                const {password:pass, ...rest} = user._doc
                res.cookie('authToken', token, {
                    expires: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
                    httpOnly: true, // Prevents JavaScript access to the cookie
                    sameSite: 'Lax', 
                    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                  });
              return res.status(200).json(rest)
        }else{
            let result = Math.random.toString(36).slice(-8)
            let generatedPassword = result.charAt(0).toUpperCase() + result.slice(1);
           try {
            bcrypt.hash(generatedPassword,10,async(err,hash)=>{
                const newUser = new User({username:name.split(" ").join("").toLowerCase().slice(0, 15),email,password:hash,avatar:photo})
               try {
                await newUser.save().then(()=>{
                    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn: 1000 * 60 * 30 })
                const {password:pass, ...rest} = newUser._doc
                res.cookie('authToken', token, {
                    expires: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
                    httpOnly: true, // Prevents JavaScript access to the cookie
                    sameSite: 'Lax', 
                    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                  });
              return res.status(200).json(rest)
                })
               } catch (error) {
                next(error)
               }
            })
           } catch (error) {
              next(error)
           }
        }
    } catch (error) {
        next(error)
    }
}