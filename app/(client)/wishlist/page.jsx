import React from 'react'
import { giayData } from '@/Data/data'
import ProductCard from '@/components/ProductCard'

const Wishlist = () => {
  
  const data=giayData.slice(0,6)

  return (
    <div className='flex flex-col mt-20 '  >
      <p className='font-bold text-4xl text-center mb-5' >
        Wishlist
      </p>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4' >
        {
          data.map((d,index) => (
            <div className='hover:border border-black transition' >
              <ProductCard   key={index}  data={d}  />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Wishlist