import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/sidebar'
function Layout() {
  const navigate=useNavigate()
  const [sidebar,setSidebar]=useState(false)
  return (
    <div className='flex flex-col items-start justify-start h-screen'>
     
     <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <div className="flex gap-2 cursor-pointer" onClick={()=>navigate('/')}>
          <div className=''>
                <img src={assets.logo} alt="icon" className='max-w-8 ' />
            </div>
            <p className='font-bold py-3 text-[#6D04DE] text-md'>Snapmind.ai</p>
         </div>

         {
          sidebar ? <X onClick={()=>setSidebar(false)} className='w-6 h-6 text-gray-500 sm:hidden'/> :<Menu onClick={()=>setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>
        }
     </nav>

     <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
         <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
         <div className="flex-1 bg-[#F4F7FB]">
             <Outlet/>
         </div>
     </div>


     

     
     {/*
     Outlet component is the placeholder where child routes will render inside a parent route's layout.only works with nested routes
     so when I define routes and their children it auto says to react that these children will be rendered inside their parents anyway instead of importing them in the code of their parent and outlet helps me position the matched children in the parent 
      */}

    </div>
    
  )
}

export default Layout