'use client';
import React from 'react'
import Navbar from './components/Navbar'
import Landingpage from './components/Landingpage'
import Recomendedsection from './components/Recomendedsection';
import Newtoopenvendor from './components/Newtoopenvendor'
import Trending from './components/Trending';
import Appadvertsection from './components/Appadvertsection';
function page() {
  return (
    <div className='font-inter'>
      <Navbar />
     <div className='rotating-gradient'>
      <Landingpage />
      <Recomendedsection/>
     </div>
      <Newtoopenvendor/>
      <Trending/>
      <Appadvertsection/>
    </div>
  )
}

export default page