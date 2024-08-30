import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase.js' 
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure,signinSate,signInSuccess } from '../redux/user/userSlice.js'

const Auth = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const {loading,error} = useSelector((state)=>state.user)
    const clickHandler = async ()=>{
           dispatch(signinSate())
          try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)

            const data = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
              }

              try {
                await axios.post("/api/auth/google",data).then((data)=>{
                    dispatch(signInSuccess(data.data))
                    console.log(data.data)
                    navigator("/")
                    return toast.success("Signin Successful")}).catch((err)=>{dispatch(signInFailure(err.message)); toast.error(err.response.data.message)})
              } catch (error) {
                dispatch(signInFailure(error.message))
                toast.error(error)
              }

            console.log(data)
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <button onClick={clickHandler} type='button' className='border p-3 bg-red-700 uppercase rounded-lg text-white'>Continut with google</button>
  )
}

export default Auth