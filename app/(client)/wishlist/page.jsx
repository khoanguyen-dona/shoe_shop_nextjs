'use client'

import React, { useState } from 'react'

import ProductCard from '@/components/ProductCard'
import {  useSelector} from 'react-redux'
import Loader from '@/components/Loader'


const Wishlist = () => {
  const addToWishlist_loading = useSelector((state)=>state.loading.status)
  const user = useSelector((state)=>state.user.currentUser)
  const wishlist = useSelector((state)=>state.wishlist.userWishlist)
  const wishlistArray = []

  wishlist?.products?.map((item)=> wishlistArray.push(item._id)) 
  const data = wishlist?.products



  return (
    <div className={`flex flex-col mt-20  ${addToWishlist_loading?'bg-white opacity-50':''} `}  >
      {data?.length===0 ?
      <p className='font-bold text-4xl text-center mb-5' > Wishlist của  bạn trống</p>
        :
      <p className='font-bold text-4xl text-center mb-5' >
        Wishlist
      </p>
      }
      {addToWishlist_loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4' >
        {user !== null && 
          data?.map((d,index) => (
            <div  key={index}   className='hover:border border-black transition' >
              <ProductCard    data={d} wishlistArray={wishlistArray} user={user}  />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Wishlist