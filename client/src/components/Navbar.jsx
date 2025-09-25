import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { UserButton, useClerk,useUser } from '@clerk/clerk-react';

function Navbar() {
  const navigate=useNavigate()

  const {user}=useUser()

  const {openSignIn}=useClerk()
  
  return (
    <div className='fixed flex  items-center  justify-items-center w-full z-5 py-3 px-4 flex-col sm:justify-between sm:flex-row sm:px-20 xl:px-32 backdrop-blur-2xl'>
         <div className="flex gap-2 cursor-pointer" onClick={()=>navigate('/')}>
            <div className=''>
                <img src={assets.logo} alt="icon" className='max-w-10 ' />
            </div>
            <p className='font-bold py-3 text-[#6D04DE] text-2xl'>Snapmind.ai</p>
         </div>

         {
            user ? <UserButton/>: (
                <button onClick={openSignIn} className='flex px-10 my-1.5 gap-1 h-10 text-sm items-center text-center text-white font-medium bg-[#6D04DE]  rounded-full cursor-pointer hover:shadow-md hover: shadow-purple-300 transition-all duration-200'>Get Started <ArrowRight /></button>

            )
         }



    </div>
  )
}

export default Navbar