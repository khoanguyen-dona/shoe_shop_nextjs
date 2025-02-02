'use client'

import React from 'react'


import ProductCard from '@/components/ProductCard'
import { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { publicRequest } from '@/requestMethod';
import { userRequest } from '@/requestMethod';
import { useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';
import Loader from '@/components/Loader';
import DoneIcon from '@mui/icons-material/Done';

import { FormatCurrency } from '@/utils/FormatCurrency';

const Clothes = () => {
  const addToWishlist_loading = useSelector((state)=>state.loading.status)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(['Áo','Quần'])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [limit, setLimit] = useState(12)
  const user =useSelector((state)=>state.user.currentUser)
  const wishlist = useSelector((state)=> state.wishlist.userWishlist)
  const wishlistArray = []
  wishlist?.products?.map((item)=> wishlistArray.push(item._id))

  const size_data = ['S','M','L','XL']
  const [size,setSize]=useState('');
  const [color, setColor] = useState('')
  const [price, setPrice] = useState([0,20000000])

  const[filter,setFilter]=useState(false)
  const[products,setProducts]=useState([])

  const [categoryList, setCategoryList] = useState([])
  const [subCategories, setSubCategories] = useState([])

  // fetching categories
  useEffect(() => {
    var categories = []
    var subCatArray = []
    setLoading(true)
    const getCategories = async () => {
        try {
            const res = await publicRequest.get('/category')
            if(res.data){
                res.data.categories.map((item) =>  {
                    categories.push(item.name)
                    const getSubCategories = async () => {    
                        const res2 = await publicRequest.get(`/sub-category/${item._id}`)
                        if(res2.data){
                            res2.data.subCategory.map((subCat)=> {
                                categories.push(subCat.name)
                                subCatArray.push(subCat.name)
                            })
                        }
                    }
                    getSubCategories()
                })
            }
            setSubCategories(subCatArray)
            setCategoryList(categories)
            setLoading(false)
        
        } catch(err){
            console.log('err while fetching categories', err)
        }
    }
    getCategories()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {    
        const res = await publicRequest.get(`/product?category=${category}&color=${color}&size=${size}&page=${page}&limit=${limit}&minPrice=${price[0]}&maxPrice=${price[1]}`)
        setProducts(res.data.products)
        setTotalPage(res.data.totalPage)
        setLoading(false)
      } catch {}
    }
    getProducts();
  },[page,price,size,color,category])

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleFilterClick = () => {
    setFilter((prev) => !prev) ;
  };

 

  const handlePrev =() => {
    setPage((prev)=>prev-1)
  }

  const handleNext =() => {
      setPage((prev)=>prev+1)
  }

  const handleReset = () => {
    setPage(1)
    setColor('')
    setSize('')
    setCategory(['Áo','Quần'])
    setPrice([0,20000000])
  }

  const handleColor = (c) => {
    setPage(1)
    if(color === c){
      setColor('')
    } else {
      setColor(c)
    }
  }

  const handleSize = (s) => {
    setPage(1)
    if(size===s){
      setSize('')
    } else {
      setSize(s)
    }
  }

const handleChooseCategory = async (cat) => {
  setPage(1)
  if(category.includes(cat)){
        setCategory(category.filter((c) => String(c) !== cat))        
  } else {
    setCategory(prev=>[...prev,cat])
  }    
}


  return (
    <div className={` ${loading||addToWishlist_loading?'bg-white opacity-50':''} `} >
      <div className='flex flex-col' >
        <img  className='object-cover w-full h-[300px] '  
         src="https://firebasestorage.googleapis.com/v0/b/adidas-shop-d0636.appspot.com/o/upload%2Fao%2Fan%20thun%20adidas%20basketball%2FAo_Thun_adidas_Basketball_trang_JE3762_21_model.avif?alt=media&token=24dcab7e-9e46-4f94-85a7-a07ec67f1dcd" 
         alt="" />
        <h1 className='text-4xl font-bold text-center mt-5' >  QUẦN ÁO </h1>
        {loading||addToWishlist_loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
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
          {products.length>0 && products?.map((d,index)=>(

            <ProductCard key={index} data={d}   user={user}  wishlistArray={wishlistArray} />

          ))}  
        </div>

        {/* pagination */}
        <div className='flex justify-around mt-24' >
          <div>
            <button  
                onClick={handlePrev} disabled = {page===1}
                className={`font-bold  transition p-3  
                  ${page===1?' text-gray-400 hover:cursor-not-allowed':' text-black hover:text-white hover:bg-black'} `} >
                    PREVIOUS</button>
          </div>
          <div className='p-3' >
            Page 
            <span className='mx-2  transition   ' > 
              <select value={page} onChange={(e)=>setPage(e.target.value)}
                  className='border-gray-300 hover:border-black hover:cursor-pointer transition border-2 p-2  '  >
               {Array.from({length: totalPage}, (_, i)=> (
                  <option key={i} value={i+1}>{i+1}</option>
               ))}
              </select> 
             
            </span> 
            of {totalPage}
          </div>
          <div>
            <button
                onClick={handleNext} disabled ={page===totalPage}
                className={`font-bold transition p-3  ${page===totalPage?' text-gray-400 hover:cursor-not-allowed':' text-black hover:text-white hover:bg-black'} `}  >NEXT</button>
          </div>
        </div>
      </div>
      
      {/* filter popup */}
      <div className={`shadow-2xl overflow-auto   fixed  bg-white  w-full md:w-2/4 xl:w-1/4  h-screen z-40  p-3 top-0 right-0  flex flex-col transform  transition-transform 
          duration-300  ${filter ? 'translate-x-0' : 'translate-x-full'}  `} >
        <div className='flex flex-row justify-between ' >
          <div>Lọc sản phẩm</div>

          <div>
            <CloseIcon className='hover:cursor-pointer'  onClick={handleFilterClick}  />
          </div>
        </div>

        <hr  className='mt-2' />
 
        {/* Price filter */}
        <div className='font-bold text-2xl mt-3' >Giá </div>
        <div className='p-4' >
          <Slider
            getAriaLabel={() => 'Price range'}
            value={price}
            min={0}
            max={20000000}
            step={2000000}
            marks={true}
            onChange={handlePrice}
          />
        </div>
        <div className='text-center font-bold' >
          {FormatCurrency(price[0])} - {FormatCurrency(price[1])} vnđ
        </div>

       
        
        <hr className='mt-2'/>
        <div className='font-bold text-2xl mt-2' >
          Size
        </div>
        <div className='flex flex-wrap' >
        {size_data.map((d,index)=>(
          <span 
            onClick={()=>handleSize(d)}
            key={index} 
            className={`w-16 rounded-md border-gray-300 border-[2px] ml-[1px] mt-[1px] p-2 text-center font-bold hover:border-gray-600 
            ${size===d ? 'bg-black text-white':'' }  `} >
              {d}
          </span>
        ))}
        </div>

        {/* color filter */}
        <div className='font-bold text-2xl mt-4' >Color </div>
        <div className='flex flex-wrap   ' >
  
            <span 
              onClick={()=>handleColor('black')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-black
              `} 
            >     
              {color==='black' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-white'/>}
            </span>
                
            <span 
              onClick={()=>handleColor('red')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-red-600
              `} 
            >   
              {color==='red' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('brown')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-amber-900
              `} 
            >   
              {color==='brown' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>
                
            <span 
              onClick={()=>handleColor('blue')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-blue-600
              `} 
            >   
              {color==='blue' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('green')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-green-600
              `} 
            >   
              {color==='green' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('yellow')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-yellow-400
              `} 
            >   
              {color==='yellow' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('gray')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-gray-400
              `} 
            >   
              {color==='gray' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('pink')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-pink-500
              `} 
            >   
              {color==='pink' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('orange')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-orange-600
              `} 
            >   
              {color==='orange' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('violet')}      
              className={`relative rounded-md w-16 h-12 border-gray-300  ml-[1px] mt-[1px] text-center hover:border-black bg-violet-500
              `} 
            >   
              {color==='violet' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>

            <span 
              onClick={()=>handleColor('white')}      
              className={`relative rounded-md w-16 h-12 border-gray-300 border-2 ml-[1px] mt-[1px] text-center hover:border-black bg-white-500
              `} 
            >   
              {color==='white' && <DoneIcon fontSize='large' className='absolute z-20 flex left-5 text-black'/>}
            </span>
      
        </div>

         {/* filter categories */}
        <div className='font-bold text-2xl mt-4' >Categories </div>
        <div className={`  bg-white text-left p-2  rounded-md  `}   >
                            {categoryList.sort()?.map((item, index)=> 
                              <div key={index} className='space-x-2' >
                                  {subCategories.includes(item)?
                                  <span className='ml-4' >-</span>
                                  :''}
                                  <input type='checkbox' 
                                      checked={category.includes(item)}
                                      onClick = {()=>handleChooseCategory(item)} 
                                      key={index} 
                                      className={`hover:bg-gray-300 p-1 hover:cursor-pointer rounded-md `}         
                                  />
                                  <span className='ml-2' >
                                      {item}
                                  </span>

                                                            
                              </div>
                            )
                    
                            }
         </div> 


        <button  className='text-2xl border-2 border-gray-300 hover:bg-black hover:text-white transition p-3 font-bold mt-4 rounded-md' onClick={handleReset} >
          Reset filter
        </button>
       

      </div>
     
    </div>
  )
}

export default Clothes