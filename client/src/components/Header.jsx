import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='bg-slate-200 shadow-md'>
        <div  className='max-w-6xl justify-between items-center p-3 flex  mx-auto'>
            <h1 className='text-xl font-extrabold sm:text-3xl flex-wrap'>
                <span className='text-slate-400'>MERN</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            <form className='flex items-center bg-slate-100 p-3 rounded-lg '>
            <input type="text" placeholder='search' className='bg-transparent focus:outline-none w-24 sm:w-64'  />
            <FaSearch/>
           </form>
        <ul className='flex items-centers gap-5'>
           <Link to="/"><li className='hidden sm:inline hover:underline text-slate-700'>Home</li></Link> 
           <Link to="/about"> <li className='hidden sm:inline hover:underline text-slate-700'>About</li></Link> 
           <Link to="/sign-in"> <li className='hover:underline text-slate-700'>Sign In</li></Link> 
        </ul>
        </div>
    </div>
  )
}

export default Header