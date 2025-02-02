'use client'

import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { setCart } from '@/redux/cartRedux'
import { setWishlist } from '@/redux/wishlistRedux'
import { setUser } from '@/redux/userRedux'
import Loader from '@/components/Loader'

const Profile  = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const handleLogoutClick = async () => {
      setLoading(true)        
      dispatch(setCart(null))
      dispatch(setWishlist(null))
      dispatch(setUser(null))   
      router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`)
    }

   

  return (
  <div className={`${loading ?'bg-white opacity-50':''} `}   >   
   {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
    <p className='font-bold text-4xl text-center mt-10'  >Profile page</p>
    <div className='px-2 md:px-8 xl:px-24 2xl:px-24 mt-20' >
        <div className=' flex flex-wrap w-full justify-center ' >
  
            <div 
                onClick ={()=> { router.push('/profile/account'); setLoading(true);}} 
                className='w-full md:w-1/5   h-[100px] lg:h-[200px] border-[1px] border-black text-center p-5  lg:p-10 text-xl font-bold
                hover:bg-black hover:text-white hover:cursor-pointer transition m-[2px] mt-2 ' >
              Account
            </div>
        
          <div 
              onClick ={()=> { router.push('/profile/order'); setLoading(true); }}
              className='w-full md:w-1/5  h-[100px] lg:h-[200px] border-[1px] border-black text-center p-5  lg:p-10 text-xl font-bold
           hover:bg-black hover:text-white hover:cursor-pointer transition m-[2px] mt-2 '  >
            Order
          </div>
         
    
        </div>
        <div className='flex justify-center' >
          <button  onClick={handleLogoutClick} className='bg-black w-full md:w-2/3   mt-4 text-white font-bold p-4
            hover:text-gray-500   transition text-3xl mb-96'  >Log out</button>
        </div>
    </div>
  </div>
  )
}

export default Profile 