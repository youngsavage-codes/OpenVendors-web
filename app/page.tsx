'use client';
import React from 'react'
import Navbar from './components/Navbar'
import Landingpage from './components/Landingpage'
import Recomendedsection from './components/Recomendedsection';
import Newtoopenvendor from './components/Newtoopenvendor/Newtoopenvendor'
import Trending from './components/Trending';
import Appadvertsection from './components/Appadvertsection';
import Reviews from './components/Reviews';
import Topratedsection from './components/Topratedsection';
import Businesssection from './components/Businesssection';
import Footer from './components/Footer';
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
      <Reviews/>
      <Topratedsection/>
      <Businesssection/>
      <Footer/>
    </div>
  )
}

export default page