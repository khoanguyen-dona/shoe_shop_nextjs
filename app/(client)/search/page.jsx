'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { FormatCurrency } from '@/utils/FormatCurrency'
import { useState, useEffect } from 'react'
import { publicRequest } from '@/requestMethod'
import Loader from '@/components/Loader'

const Search = () => {
  const [loading, setLoading] = useState(true)
  const search_keyword = useSearchParams().get('q')
  const [data, setData] = useState()
  const page = 1
  const limit = 10


  useEffect(()=>{
    const getProducts = async () =>{
      const res = await publicRequest.get(`/product/find/${search_keyword}?page=${page}&limit=${limit}`)
      if(res.data){
        setData(res.data.products)
        setLoading(false)
      }
    }
    getProducts()
  }, [search_keyword])
  console.log('data',data)
  return (
    <div className={`px-4 md:px-24 2xl:px-48   ${loading?'bg-white opacity-50':''}  `} >
      {loading ?
        <div className='flex justify-center ' >  <Loader  color={'inherit'} />  </div> : ''
      }
      <div className='flex flex-col mt-20 ' >
        <p className='font-bold text-3xl text-center mb-4' >  Kết quả tìm kiếm cho <span className='text-red-500' > {search_keyword} </span> </p>
        {

          <p className='text-red-500 flex justify-center  text-3xl font-semibold mb-20 '>{data?.length} kết quả</p>
        }
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center' >
          {data?.map((product, index) => 
          <a key={index}  href={`/product-detail/${product._id}`} className='flex  flex-col  ml-2 mt-4   transition hover:border-2 hover:border-black   ' >
            <img src={product.thumbnail} alt={product.name} />
            <p className='font-bold ' >{product.name}</p>
            <p>{FormatCurrency(product.price)} đ</p>
          </a>
          )}      
        </div>

      </div>
    </div>
  )
}

export default Search