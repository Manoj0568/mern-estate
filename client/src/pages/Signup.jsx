import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Auth from '../Oauth/Auth'

const Signup = () => {
    const navigator = useNavigate()
    const [formdata,setFormdata] = useState({})

    const changeHandler = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.id]:e.target.value
        })
    }

    const submitHandler = async(e)=>{
        e.preventDefault()

        const {username,email,password} = formdata
        console.log(username,email,password)
        if(username=="" || email =="" || password=="" || !username || !email || !password){
            return toast.error('feilds cannot be empty')
        }
    
        if (!/^[a-zA-Z0-9_]{5,15}$/.test(username)) {
          return toast.error('Username must be 5-15 characters long and contain only letters, numbers, or underscores.')
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return toast.error('Please enter a valid email address.')
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            return toast.error('Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.')
        }
        try {
            await axios.post("/api/auth/signup",formdata).then(()=>{
                navigator("/sign-in")
                return toast.success("Signup Successful")
            }).catch((err)=>toast.error(err.response.data.message))
        } catch (error) {
            toast.error(error)
        }


    }
  return (
    <div className='p-3 max-w-3xl sm:w-1/2 lg:w-1/4 mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>SignUP</h1>
        <form className='flex flex-col gap-4 ' onSubmit={submitHandler}>
            <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={changeHandler} />
            <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={changeHandler} />
            <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={changeHandler} />
            <button type="submit" className='border bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>SignUP</button>
            <Auth/>
        </form>
        <div className='flex gap-2 mt-5 justify-center'>
            <p>Have an account</p>
            <Link to="/sign-in"><span className='text-blue-700'>Sign In</span></Link>
        </div>
    </div>
  )
}

export default Signup