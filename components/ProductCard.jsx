'use client'
import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FormatCurrency } from '@/utils/FormatCurrency';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { userRequest } from '@/requestMethod';
import { setWishlist } from '@/redux/wishlistRedux';
import FailurePopup from './Popup/FailurePopup';
import { useState } from 'react';

const ProductCard = ({data, user, wishlistArray}) => {
  const dispatch = useDispatch()

  const [notifyPopup, setNotifyPopup] = useState(false)
  var categories = String(data.categories).split(',').join(', ')
  const addToWishlist = async (e) => {
    e.preventDefault()
    if(user===null) {
      setNotifyPopup(true)
      setTimeout(()=> {
        setNotifyPopup(false)
      }, 3000)
    } else {
      try {
        const res = await userRequest.post(`/wishlist/${user._id}`, {
          productId: data._id
        })
        if(res.data){
          dispatch(setWishlist(res.data.wishlist))
        }

      } catch(err) {
        console.log(err)
      }
    }
  }

  const handleClosePopup =  () => {
    setNotifyPopup(false)
    console.log('clicked')
  }
  
 

  return (
    <div>
      {notifyPopup ?
     
        <FailurePopup message={'Đăng nhập để sử dụng chức năng này'} handleClosePopup = {handleClosePopup}  />
      
        : ''
      }
      <div className=' flex flex-col relative p-1    hover:opacity-60 transition' >
        <a className='flex flex-col' href={`/product-detail/${data._id}`}>

          <div className='absolute top-4 right-4 z-10' >
              {user!==null && wishlistArray.includes(data._id) ?
              <FavoriteIcon  onClick={addToWishlist}  className='text-black hover:text-gray-400 transition' />
              :
              <FavoriteBorderIcon  onClick={addToWishlist}  className='text-gray-500 hover:text-black transition' />
              }
          </div>
          <img  className='object-cover w-full transition p-1' src={data.thumbnail} alt="" />
          <span className='font-bold ' > {data.name}</span>
          <span className='font-semiblod ' >{FormatCurrency(data.price)} đ</span>
          <span>     
            {categories}
          </span>       
        </a>
      </div>
    </div>
  )
}

export default ProductCard