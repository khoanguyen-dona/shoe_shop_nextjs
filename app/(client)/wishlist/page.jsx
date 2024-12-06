'use client'

import React from 'react'

import ProductCard from '@/components/ProductCard'
import {  useSelector } from 'react-redux'



const Wishlist = () => {
  const user = useSelector((state)=>state.user.currentUser)
  const wishlist = useSelector((state)=>state.wishlist.userWishlist)
  const wishlistArray = []

  wishlist?.products?.map((item)=> wishlistArray.push(item._id)) 
  const data = wishlist?.products

  console.log('wlA --->',wishlist)

  return (
    <div className='flex flex-col mt-20 '  >
      {data?.length===0 ?
      <p className='font-bold text-4xl text-center mb-5' > Wishlist của  bạn trống</p>
        :
      <p className='font-bold text-4xl text-center mb-5' >
        Wishlist
      </p>
      }
     
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4' >
        {
          data?.map((d,index) => (
            <div  className='hover:border border-black transition' >
              <ProductCard  key={index}   data={d} wishlistArray={wishlistArray} user={user}  />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Wishlist