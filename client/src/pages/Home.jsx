import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AITools from '../components/AITools'
import Testimonial from '../components/Testimonial'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero />
        <AITools/>

        <Testimonial/>
    </div>
  )
}

export default Home