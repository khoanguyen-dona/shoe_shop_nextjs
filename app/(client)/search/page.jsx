'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { FormatCurrency } from '@/utils/FormatCurrency'



const Search = () => {
  const search_keyword = useSearchParams().get('q')

  return (
    <div className='px-4 md:px-24 2xl:px-48  ' >
      <div className='flex flex-col mt-20 ' >
        <p className='font-bold text-3xl text-center mb-20' >  Kết quả tìm kiếm cho <span className='text-red-500' > {search_keyword} </span> </p>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center' >

          <a href='/product-detail/123' className='flex  flex-col  ml-2 mt-3 ' >
            <img src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
            <p className='font-bold ' >Adizero SL</p>
            <p>{FormatCurrency(2600000)} đ</p>
          </a>

          <a href='/product-detail/123' className='flex  flex-col  ml-2 mt-3 ' >
            <img src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
            <p className='font-bold ' >Adizero SL</p>
            <p>{FormatCurrency(2600000)} đ</p>
          </a>

          <a  href='/product-detail/123' className='flex  flex-col  ml-2 mt-3 ' >
            <img src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
            <p className='font-bold ' >Adizero SL</p>
            <p>{FormatCurrency(2600000)} đ</p>
          </a>

          <a  href='/product-detail/123' className='flex  flex-col  ml-2 mt-3 ' >
            <img src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
            <p className='font-bold ' >Adizero SL</p>
            <p>{FormatCurrency(2600000)} đ</p>
          </a>

          <a  href='/product-detail/123' className='flex  flex-col  ml-2 mt-3 ' >
            <img src="https://adidas.donawebs.com/wp-content/uploads/2024/11/ADIZERO_SL_trang_IG5941_HM3_hover.avif" alt="" />
            <p className='font-bold ' >Adizero SL</p>
            <p>{FormatCurrency(2600000)} đ</p>
          </a>
          
          
        </div>

      </div>
    </div>
  )
}

export default Search