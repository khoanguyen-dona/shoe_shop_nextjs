'use client'

import React from 'react'


import ProductCard from '@/components/ProductCard'
import { quanAoData } from '@/Data/data'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';


const Clothes = () => {
  const size_data = ['S','M','L','XL']
  const [size,setSize]=useState([]);

  const[filter,setFilter]=useState(false)

  const handleFilterClick = () => {
    setFilter((prev) => !prev) ;
  };

  const handleSizeClick = (d) => {

    if(size.includes(d)) {
      const updatedSize = size.filter((s) => s !== d );
      setSize(updatedSize)
    } else {
      setSize((prev) => [...prev,d] );
    }
    
  };

  return (
    <div className='' >
      <div className='flex flex-col' >
        <img  className='object-cover w-full h-[300px] '  
         src="https://adidas.donawebs.com/wp-content/uploads/2024/11/Ao_Thun_adidas_Basketball_trang_JE3762_21_model.avif" 
         alt="" />
        <h1 className='text-4xl font-bold text-center mt-5' >  GIÀY </h1>
        <div className='flex justify-end'>
          <button  
            onClick={handleFilterClick}
            className='mr-2 mt-2 p-2 border-2 transition border-black text-xl w-48 font-bold flex-end hover:bg-black
            hover:text-white' >
              Bộ lọc
          </button>
        </div>
        {/* product list */}
        <div className=' grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-2   mt-10  mx-2' >
          {quanAoData.map((d,index)=>(

            <ProductCard key={index} data={d} />

          ))}  
        </div>

        {/* pagination */}
        <div className='flex justify-around mt-24' >
          <div>
            <button className='font-bold hover:bg-black hover:text-white transition p-3' >PREVIOUS</button>
          </div>
          <div className='p-3' >
            Page 1 of 5
          </div>
          <div>
            <button className='font-bold hover:bg-black hover:text-white transition p-3'  >NEXT</button>
          </div>
        </div>
      </div>
      
      {/* filter popup */}
      <div className={`shadow-2xl   fixed  bg-white w-1/4 h-screen z-20  p-3 top-0 right-0  flex flex-col transform  transition-transform 
          duration-300  ${filter ? 'translate-x-0' : 'translate-x-full'}  `} >
        <div className='flex flex-row justify-between ' >
          <div>Lọc sản phẩm</div>

          <div>
            <CloseIcon onClick={handleFilterClick}  />
          </div>
        </div>

        <hr  className='mt-2' />
 
        <div className='font-bold text-2xl mt-3' >GIÁ </div>

        <div className='flex flex-col' >
          <label htmlFor="">
            <input type='radio' value="1" name='gia' />
            <span className='ml-3' >0 - 1.000.000 đ</span>
          </label>
          <label htmlFor="">
            <input type='radio' value="2" name='gia' />
            <span className='ml-3' >1.000.000 - 2.000.000 đ </span>
          </label>
          <label htmlFor="">
            <input type='radio' value="3" name='gia' />
            <span className='ml-3' >2.000.000 - 4.000.000 đ</span>
          </label>
          <label htmlFor="">
            <input type='radio' value="4" name='gia' />
            <span className='ml-3' >Trên 4.000.000 đ</span>
          </label>
        </div>
        
        <hr className='mt-2'/>
        <div className='font-bold text-2xl mt-2' >
          Size
        </div>
        <div className='flex flex-wrap' >
        {size_data.map((d,index)=>(
          <span 
            onClick={()=>handleSizeClick(d)}
            key={index} 
            className={`w-16 border-gray-300 border-[2px] ml-[1px] mt-[1px] text-center hover:border-gray-600 
            ${size.includes(d) ? 'bg-black text-white':'' }  `} >
              {d}
          </span>
        ))}
        </div>
       

      </div>
     
    </div>
  )
}

export default Clothes