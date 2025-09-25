import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
     Layout
     <Outlet/>
     {/*
     Outlet component is the placeholder where child routes will render inside a parent route's layout.only works with nested routes
     so when I define routes and their children it auto says to react that these children will be rendered inside their parents anyway instead of importing them in the code of their parent and outlet helps me position the matched children in the parent 
      */}

    </div>
    
  )
}

export default Layout