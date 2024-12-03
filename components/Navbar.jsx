'use client'

import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import  { useRouter } from 'next/navigation';
import {useSelector} from "react-redux" 


const Navbar = () => {
  const cart = useSelector((state) =>state.cart.userCart)
  const user = useSelector((state) => state.user.currentUser)
  const wishlist = useSelector((state) => state.wishlist.userWishlist)
  const[searchMobile,setSearchMobile]=useState(false)
  const[menu,setMenu]=useState(false)
  const router = useRouter()
  const[searchTerm,setSearchTerm]=useState('')
 



  const handleToggle = () => {
    setMenu((prev) => !prev)
  }

  const handleKeyDown = (e) => {
    if (e.key==='Enter'){
      router.push(`/search?q=${searchTerm}`)
      setSearchMobile(false)
    }
  }
  const handleSearch = () => {
    router.push(`/search?q=${searchTerm}`)    
  }
  const handleSearchMobileClick = () => {
    setSearchMobile(prev => !prev)
    
  }

  return (
  <div>

    {/* desktop navbar */}
    <div className='hidden lg:block' >
      <div className= '   flex  bg-gray-300  space-x-10 h-16 justify-around  text-center py-5' >
        <div className='' >
          <a href='/' className='text-3xl'  > <strong> ShoeShop </strong>  </a>

        </div>

        <div className='space-x-10' >  
          <a href='/shoe' className='  hover:border-b-black hover:border-b-4'  >Giày</a>
          <a href='/clothes' className='  hover:border-b-black hover:border-b-4' >Quần áo</a>
          <a href='/accessories' className='  hover:border-b-black hover:border-b-4'>Phụ kiện</a>      
        </div>

        <div className='space-x-10  ' >
          <span className='border-1' >
            <input 
              onKeyDown={handleKeyDown}
              className='w-64 p-1 ' type="text"  
              onChange={(e)=>setSearchTerm(e.target.value)}  />
            <span className='p-1 border-2 bg-black hover:bg-gray-500 transition' onClick={handleSearch} >
              <SearchIcon sx={{color:'white'}} />
            </span>          
          </span>  
          <a href='/wishlist' className='relative  ' >
            <FavoriteBorderIcon sx={{fontSize: '30px'}} />
            { wishlist === null ||  wishlist?.products?.length === 0 ? '' :
            <span className='absolute bg-red-500 text-white rounded-xl w-6 h-6 left-5  text-center  bottom-2'  >
              { wishlist?.products?.length } </span>
            }
          </a>    
          <a href='/cart' className='relative' > 
            <ShoppingCartOutlinedIcon sx={{fontSize: '30px'}}/> 
            {cart===null ||  cart?.products?.length === 0 ? '' : 
            <span className='absolute bg-red-500 text-white rounded-xl w-6 h-6 left-5  text-center  bottom-2'  > 
              { cart?.products?.length } </span>
            }
          </a>
          { user!== null ?
          <a href={`/profile/${user._id}`} >
          <AccountCircleOutlinedIcon sx={{fontSize: '30px'}}/>
          </a> :
          <a href='/login' >
            <AccountCircleOutlinedIcon sx={{fontSize: '30px'}}/>
          </a>
          }
        </div>
      </div>
    </div>
    {/* mobile navbar */}
    <div className='block lg:hidden' >     
      <div className='flex justify-around h-[70px] bg-gray-300  w-screen py-4 px-2 ' >
        <MenuIcon fontSize='large'  onClick={handleToggle} />
        <span>
          <SearchIcon fontSize='large' onClick={handleSearchMobileClick} />
        </span>
        <span className='font-bold text-xl' >
          <a href="/">ShoeShop </a>  
          </span>
        <span className='relative' >
          <a href="/wishlist">
            <FavoriteBorderIcon fontSize='large' />
            {wishlist === null ||  wishlist?.products?.length === 0 ? '' :
            <span className='absolute bottom-5 left-5 px-2  rounded-full text-white bg-red-500 ' >
              {wishlist?.products?.length}</span>
            }
          </a>
        </span>
        <span className='relative' >
          <a href="/cart">
            <ShoppingCartOutlinedIcon fontSize='large' />
            {cart===''|| cart === null || cart?.products?.length === 0 ? '' :
            <span className='absolute bottom-5 left-5 px-2 rounded-full text-white bg-red-500 ' >
              {cart?.products?.length}</span>
            }
          </a>
        </span>
        
        <span>
        { user!== null ?
          <a href={`/profile/${user._id}`} >
          <AccountCircleOutlinedIcon sx={{fontSize: '30px'}}/>
          </a> :
          <a href='/login' >
            <AccountCircleOutlinedIcon sx={{fontSize: '30px'}}/>
          </a>
          }
        </span>
      </div>     
    </div>
    {/* mobile toggle sidebar */}
    <div className={`w-screen h-screen transform duration-300  transition-transform bg-white top-0 z-50 fixed flex flex-col p-4
      ${menu?'translate-x-0':'-translate-x-full'} `} >
      <div className='flex transition mb-5 justify-between '   >
        <p className='font-extrabold text-4xl  ' >ShoeShop</p>
        <CloseIcon   onClick={handleToggle} fontSize='large' />
      </div>
      <hr />
      <div className=' mt-4 space-y-4 text-2xl font-bold' >
        <p> 
          <a href="/shoe">
            Giày
          </a>
        </p>
        <p>
          <a href="/clothes">
          Quần áo
          </a>
        </p> 
        <p>
          <a href="/accessories">
            Phụ kiện
          </a>
        </p>
      </div>
    </div> 
    {/* searchMobile */}
    <div className={` w-screen h-screen bg-gray-700 top-0 fixed z-50 flex flex-col transition-transform
        ${searchMobile?'translate-x-0 opacity-95 ':'-translate-x-full'} `}>
      <div className='flex justify-between p-4 mb-10' >
        <p className='font-bold text-2xl text-gray-300' >Tìm kiếm</p>
        <CloseIcon  className='text-white' onClick={handleSearchMobileClick} fontSize='large' />
      </div>
      <div className='px-4' >
        <input type="text" className='p-4 border w-full rounded-xl' onKeyDown={handleKeyDown} placeholder='Nhập từ khóa ..'
            onChange={(e)=>setSearchTerm(e.target.value)}/>
      </div>
    </div>
    
  </div>
  )
}

export default Navbar