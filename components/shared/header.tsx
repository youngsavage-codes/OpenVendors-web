import { images } from '@/constant/images'
import { ArrowRight2, Chart, Notification, SearchNormal } from 'iconsax-reactjs'
import Image from 'next/image'
import AvartarDropDown from './avartarDropDown';
import NotificationSheet from '../sheets/notificationSheet';


const Header = () => {
  return (
    <div className='px-10 border-b-2 border-[#E9EBEC]'>
        <div className='flex items-center justify-between'>
            <Image src={images.logoBlack} width={90} height={90} alt='logo' />
            <div className='flex items-center gap-8'>
                <button className='flex items-center gap-3 bg-[#1F363D] py-5 px-5 rounded-full text-white'>
                    <h5 className='font-semibold'>Continue Setup</h5>
                    <ArrowRight2 />
                </button>
                <SearchNormal size={30} />
                <Chart size={30} />
                <NotificationSheet />
                <AvartarDropDown />
            </div>
            {/* <Image src={images.logowithtextblack} width={100} height={100} alt='' /> */}
        </div>


    </div>
  )
}

export default Header