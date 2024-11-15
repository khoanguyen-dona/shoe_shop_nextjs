import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
const Navbar = () => {
  return (
    <div className= 'bg-gray-300 flex space-x-10 h-16 justify-around  text-center py-5' >
      <div className='' >
        <a href='/' className='text-3xl'  > <strong> ShoeShop </strong>  </a>

      </div>

      <div className='space-x-10' >  
        <a href='/shoe' className='  hover:border-b-black hover:border-b-4'  >Giày</a>
        <a href='/clothes' className='  hover:border-b-black hover:border-b-4' >Quần áo</a>
        <a href='/accessories' className='  hover:border-b-black hover:border-b-4'>Phụ kiện</a>      
      </div>

      <div className='space-x-10  ' >  
        <a href='/wishlist' className='relative  ' >
          <FavoriteBorderIcon sx={{fontSize: '30px'}} />
          <span className='absolute bg-red-500 text-white rounded-xl w-6 h-6 left-5  text-center  bottom-2'  > 1 </span>
        </a>    
        <a href='/cart' className='relative' > 
          <ShoppingCartOutlinedIcon sx={{fontSize: '30px'}}/> 
          <span className='absolute bg-red-500 text-white rounded-xl w-6 h-6 left-5  text-center  bottom-2'  > 2 </span>
        </a>
        <a href='/login' >
          <AccountCircleOutlinedIcon sx={{fontSize: '30px'}}/>
        </a>
      </div>
    </div>
  )
}

export default Navbar