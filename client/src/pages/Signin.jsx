import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signinSate,signInFailure,signInSuccess } from '../redux/user/userSlice'
import Auth from '../Oauth/Auth'

const Signin = () => {
    const navigator = useNavigate()
    const [formdata,setFormdata] = useState({})
    const {loading,error} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const changeHandler = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.id]:e.target.value
        })
    }

    const submitHandler = async(e)=>{
        e.preventDefault()

        const {email,password} = formdata
        console.log(email,password)
        if( email =="" || password=="" || !email || !password){
            return toast.error('feilds cannot be empty')
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return toast.error('Please enter a valid email address.')
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            return toast.error('Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.')
        }
        try {
             dispatch(signinSate())
             console.log(loading,error)
            await axios.post("/api/auth/signin",formdata).then((data)=>{
                dispatch(signInSuccess(data.data))
                console.log(data.data)
                navigator("/")
                return toast.success("Signin Successful")
            }).catch((err)=>{dispatch(signInFailure(err.message)); toast.error(err.response.data.message)})
        } catch (error) {
            dispatch(signInFailure(error.message))
            console.log(loading,error)
            toast.error(error)
        }


    }
  return (
    <div className='p-3 max-w-3xl sm:w-1/2 lg:w-1/4 mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign IN</h1>
        <form className='flex flex-col gap-4 ' onSubmit={submitHandler}>
            <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={changeHandler} />
            <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={changeHandler} />
            <button type="submit" className='border bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>
            <Auth/>
        </form>
        <div className='flex gap-2 mt-5 justify-center'>
            <p>Not having an account</p>
            <Link to="/sign-up"><span className='text-blue-700'>Sign Up</span></Link>
        </div>
    </div>
  )
}

export default Signin