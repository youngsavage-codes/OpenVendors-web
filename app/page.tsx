'use client';
import Appadvertsection from '@/components/Appadvertsection';
import Businesssection from '@/components/Businesssection';
import Footer from '@/components/Footer';
import Landingpage from '@/components/Landingpage';
import Navbar from '@/components/Navbar';
import Newtoopenvendor from '@/components/Newtoopenvendor/Newtoopenvendor';
import Recomendedsection from '@/components/Recomendedsection';
import Reviews from '@/components/Reviews';
import Topratedsection from '@/components/Topratedsection';
import Trending from '@/components/Trending';

function page() {
  return (
    <div className='font-inter'>
      <Navbar />
     <div className=''>
      <Landingpage />
      {/* <Recomendedsection/> */}
     </div>
      {/* <Newtoopenvendor/>
      <Trending/>
      <Appadvertsection/>
      <Reviews/>
      <Topratedsection/>
      <Businesssection/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default page