'use client'
import React from 'react'

import ProductCard from '@/components/ProductCard'
import { useState ,useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from 'react-redux';
import { publicRequest } from '@/requestMethod';


const Shoe = () => {
  const user =useSelector((state)=>state.user.currentUser)
  const wishlist = useSelector((state)=> state.wishlist.userWishlist)
  const wishlistArray = []
  wishlist.wishlist.products.map((item)=> wishlistArray.push(item._id))


  console.log('wishl--->',wishlist)

  const size_data = ['5 US','5.5 US','6 US','6.5 US','7 US','7.5 US','8 US','8.5 US','9 US','9.5 US','10 US','10.5 US',
    '11 US']
  const [size,setSize]=useState([]);
  const[filter,setFilter]=useState(false)
  const[products,setProducts]=useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {    
        const res = await publicRequest.get('/product?category=Giày')
        setProducts(res.data)
      } catch {}
    }
    getProducts();
  },[])

console.log('products--->',products)

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
         src="https://adidas.donawebs.com/wp-content/uploads/2024/11/Giay_Ultraboost_Light_DJen_GY9351_HM4.avif" 
         alt="" />
        <h1 className='text-4xl font-bold text-center mt-5' >  GIÀY </h1>
        <div className='flex justify-end'>
          <button  
            onClick={handleFilterClick}
            className='mr-2 mt-2 p-2 border-2 transition border-black text-xl w-32 font-bold flex-end hover:bg-black
            hover:text-white' >
              Bộ lọc
              <FilterAltIcon fontSize='large' />
          </button>
        </div>
        {/* product list */}
        <div className=' grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-2   mt-2  mx-2' >
          {products?.map((d,index)=>(
            <ProductCard key={index} data={d} user={user}  wishlistArray={wishlistArray} />         
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
      <div className={`shadow-2xl   fixed  bg-white  w-full md:w-2/4 xl:w-1/4  h-screen z-20  p-3 top-0 right-0  flex flex-col transform  transition-transform 
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

export default Shoe