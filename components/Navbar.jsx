'use client'

import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import  { useRouter, redirect } from 'next/navigation';
import {useSelector, useDispatch} from "react-redux" 
import { setCart } from '@/redux/cartRedux';
import { setWishlist } from '@/redux/wishlistRedux';
import { setUser } from '@/redux/userRedux';
import Loader from './Loader';
import SuccessPopup from './Popup/SuccessPopup';
import { CircularProgress } from '@mui/material'

const Navbar = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) =>state.cart.userCart)
  const user = useSelector((state) => state.user.currentUser)
  const wishlist = useSelector((state) => state.wishlist.userWishlist)
  const[searchMobile,setSearchMobile]=useState(false)
  const[menu,setMenu]=useState(false)
  const router = useRouter()
  const[searchTerm,setSearchTerm]=useState('')
  const [userMenu, setUserMenu] =useState(false)
  const [loading, setLoading]= useState(false)
  const [notifySuccess, setNotifySuccess] = useState(false)

  const handleClosePopup = () => {
    setNotifySuccess(false)
  }

  const handleUserMenu = () => {
    setUserMenu(prev =>!prev)
  }

  const handleToggle = () => {
    setMenu((prev) => !prev)
  }

  const handleKeyDown = (e) => {
    if (e.key==='Enter'){
      setLoading(true)
      router.push(`/search?q=${searchTerm}`)
      setSearchMobile(false)
      setLoading(false)
    }
  }
  const handleSearch = () => {
    setLoading(true)
    router.push(`/search?q=${searchTerm}`)  
    setSearchMobile(false)
    setLoading(false) 
  }
  const handleSearchMobileClick = () => {
    setSearchMobile((prev)=>!prev)
    
  }

  const handleLogoutClick = async () => {
    setLoading(true)  
    
    dispatch(setCart(null))
    dispatch(setWishlist(null))
    dispatch(setUser(null))   
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`)
     
  }
  const handleNavigate = async (url) => {
    setLoading(true)
    router.push(`/${url}`)
    setMenu(false)
    setLoading(false)
  }
 

  return (
 <>
  <div className=''  >
    <div >
      {/* desktop navbar */}
      <div className='hidden lg:block  ' >
        <div className= '   flex  bg-gray-300  space-x-10 h-16 justify-between px-5  items-center ' >
          <div className='' >
            <a href='/' className='text-4xl  mb-4'  > <strong> ShoeShop  </strong>  </a>

          </div>

          <div className='space-x-10' >  
            <a href='/shoe' onClick={()=>setLoading(true)} className='  hover:border-b-black hover:border-b-4'  >Giày</a>
            <a href='/clothes' onClick={()=>setLoading(true)}  className='  hover:border-b-black hover:border-b-4' >Quần áo</a>
            <a href='/accessories' onClick={()=>setLoading(true)}  className='  hover:border-b-black hover:border-b-4'>Phụ kiện</a>      
          </div>

          <div className='space-x-10 flex justify-between ' >
            {/* search */}
            <span className='border-1' >
              <input 
                onKeyDown={handleKeyDown}
                className='w-64 p-1 ' type="text"  
                onChange={(e)=>setSearchTerm(e.target.value)}  
              />
             
              <span className='p-1 border-2 bg-black hover:bg-gray-500 transition' onClick={handleSearch} >
                <SearchIcon sx={{color:'white'}} />
              </span>          
            </span>
            {/* wishlist   */}
            <a href='/wishlist' onClick={()=>setLoading(true)} className='relative  ' >
              <FavoriteBorderIcon sx={{fontSize: '30px'}} />
              {user===null || wishlist === null ||  wishlist?.products?.length === 0 ? '' :
              <span className='absolute bg-red-500 text-white rounded-xl w-6 h-6 left-5  text-center  bottom-4'  >
                { wishlist?.products?.length } </span>
              }
            </a>  
            {/* cart    */}
            <a href='/cart'  onClick={()=>setLoading(true)}  className='relative' > 
              <ShoppingCartOutlinedIcon sx={{fontSize: '30px'}}/> 
              {cart===null ||  cart?.products?.length === 0 ? '' : 
              <span className='absolute bg-red-500 text-white rounded-xl w-6 h-6 left-5  text-center  bottom-4'  > 
                { cart?.products?.length } </span>
              }
            </a>
            {/* user */}
            { user!== null && user?.img!=='' ?
            <span className='' >
              {/* <AccountCircleOutlinedIcon sx={{fontSize: '30px'}}  className='hover:cursor-pointer' onClick={handleUserMenu}/> */}
                <img src={user?.img}  className='w-8 h-8 aligns-center rounded-full object-cover  hover:cursor-pointer' onClick={handleUserMenu}/>
               
              { userMenu &&
                <div className='  flex flex-col text-left p-2 w-32 bg-white h-48 rounded shadow-2xl absolute right-5 top-14 z-30 ' >
                  <a href="/profile/account" onClick={()=>setLoading(true)} >
                    <div className='hover:text-white hover:bg-black font-bold  p-2 rounded transition ' >Account</div>
                  </a>
                  <a href="/profile/order" onClick={()=>setLoading(true)} >
                    <div className='hover:text-white hover:bg-black font-bold p-2 rounded transition ' >Order</div>
                  </a>
                  <hr />
                  <div 
                      onClick={handleLogoutClick}
                      className='text-red-500 className hover:text-white hover:bg-red-500 font-bold p-2 rounded hover:cursor-pointer' >
                        Log out
                  </div>
                </div> 
                
                }   

            </span> :
            <a href='/login' onClick={()=>setLoading(true)} >
              <AccountCircleOutlinedIcon sx={{fontSize: '30px'}}/>
            </a>
            }
          </div>
        </div>
      </div>
      {/* usermenu when hover */}
      {/* <div className=' opacity-0  hover:opacity-100  flex flex-col text-left p-2 w-32 bg-white h-48 rounded shadow-2xl absolute right-10 top-12 z-40 ' >
            <a href="/profile/account">
              <div className='hover:text-white hover:bg-black font-bold  p-2 rounded transition ' >Account</div>
            </a>
            <a href="/profile/order">
              <div className='hover:text-white hover:bg-black font-bold p-2 rounded transition ' >Order</div>
            </a>
            <hr />
            <div 
                onClick={handleLogoutClick}
                className='text-red-400 className hover:text-white hover:bg-red-500 font-bold p-2 rounded hover:cursor-pointer' >Log out</div>
      </div> */}


      {/* mobile navbar */}
      <div className='block lg:hidden' >     
        <div className='flex justify-around h-[70px] bg-gray-300  w-screen py-4 px-2 ' >
          <MenuIcon fontSize='large' className='hover:cursor-pointer' onClick={handleToggle} />
          <span>
            <SearchIcon fontSize='large'  className='hover:cursor-pointer' onClick={handleSearchMobileClick} />
          </span>
          <span className='font-extrabold text-2xl' >
            <a href="/" onClick={()=>setLoading(true)}   >ShoeShop </a>  
            </span>
          <span className='relative' >
            <a href="/wishlist" onClick={()=>setLoading(true)}   >
              <FavoriteBorderIcon fontSize='large' />
              {wishlist === null ||  wishlist?.products?.length === 0 ? '' :
              <span className='absolute bottom-5 left-5 px-2  rounded-full text-white bg-red-500 ' >
                {wishlist?.products?.length}</span>
              }
            </a>
          </span>
          <span className='relative' >
            <a href="/cart" onClick={()=>setLoading(true)}  >
              <ShoppingCartOutlinedIcon fontSize='large' />
              {cart===''|| cart === null || cart?.products?.length === 0 ? '' :
              <span className='absolute bottom-5 left-5 px-2 rounded-full text-white bg-red-500 ' >
                {cart?.products?.length}</span>
              }
            </a>
          </span>
          
          <span>
          { user!== null && user?.img!=='' ?
            <a href={`/profile/${user._id}`} onClick={()=>setLoading(true)}   >
              <img src={user?.img} className='w-9 h-9 object-cover rounded-full' alt="" />
            </a> :
            <a href='/login'   onClick={()=>setLoading(true)} >
              <AccountCircleOutlinedIcon sx={{fontSize: '36px'}}/>
            </a>
            }
          </span>
        </div>     
      </div>
      {/* mobile toggle sidebar */}
      <div className={`w-screen h-screen transform duration-300  transition-transform bg-white top-0 z-30 fixed flex flex-col p-4
        ${menu?'translate-x-0':'-translate-x-full'} `} >
        <div className='flex transition mb-5 justify-between '   >
          <p className='font-extrabold text-4xl  ' > <a href="/" onClick={()=>setLoading(true)}  > ShoeShop </a> </p>
          <CloseIcon  className='hover:cursor-pointer' onClick={handleToggle} fontSize='large' />
        </div>
        <hr />
        <div className=' mt-4 space-y-4 text-2xl font-bold  ' >
          <p className='hover:bg-black hover:text-white hover:cursor-pointer p-2 transition '> 
            <p  onClick={()=>handleNavigate('shoe')}  >
              Giày
            </p>
          </p>
          <p  className='hover:bg-black hover:text-white hover:cursor-pointer p-2 transition '>
            <p  onClick={()=>handleNavigate('clothes')}  >
            Quần áo
            </p>
          </p> 
          <p  className='hover:bg-black hover:text-white hover:cursor-pointer p-2 transition '>
            <p  onClick={()=>handleNavigate('accessories')}  >
              Phụ kiện
            </p>
          </p>
        </div>
      </div> 
      {/* searchMobile */}
      <div className={` w-screen h-screen bg-gray-700 top-0 fixed z-30 flex flex-col transition-transform
          ${searchMobile?'translate-x-0 opacity-95 ':'-translate-x-full'} `}>
        <div className='flex justify-between p-4 mb-10' >
          <p className='font-bold text-2xl text-gray-300' >Tìm kiếm</p>
          <CloseIcon  className='text-white' onClick={handleSearchMobileClick} fontSize='large' />
        </div>
        <div className='px-4 mr-4 flex' >
          <input type="text" className='p-4 border w-full  rounded-lg mr-2' onKeyDown={handleKeyDown} placeholder='Nhập từ khóa ..'
              onChange={(e)=>setSearchTerm(e.target.value)}/>
          <SearchIcon  onClick={handleSearch}  sx={{fontSize:'60px'}}  className='rounded-lg bg-black text-white  p-1
               hover:bg-gray-500 hover:cursor-pointer transition' />
        </div>
      </div>
      
    </div>
     {/* loader */}
    <div className={`fixed w-screen h-screen  z-30  ${loading ?'bg-white opacity-50 block ':'hidden'} `}  >
      {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
    </div>
    {/* Notify */}
    {notifySuccess ? 
            <div  className='absolute flex justify-center p-4  ' > 
                <SuccessPopup  message={'Log out Successfully! redirecting...'}  handleClosePopup={handleClosePopup}   /> 
            </div>  : '' }
  </div>
  {/* { loading &&
    <div className='fixed w-screen h-screen bg-gray-500 opacity-50 z-40' >
  </div>
  } */}
</>
  )
}

export default Navbar