import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FormatCurrency } from '@/utils/FormatCurrency';
import FavoriteIcon from '@mui/icons-material/Favorite';
const ProductCard = ({data}) => {
  return (
    <div className=' flex flex-col relative  ' >
      <a className='flex flex-col' href={`/product-detail/${data.id}`}>

        <div className='absolute top-4 right-4 z-10' >
     
            <FavoriteBorderIcon className='text-gray-600 hover:text-gray-400 transition' />
         
        </div>
        <img  className='object-cover w-full transition p-1' src={data.thumbnail} alt="" />
        <span className='font-bold ' >{FormatCurrency(data.price)} đ</span>
        <span>{data.productName}</span>
        <span className='font-extralight' >Chạy</span>
        <span className='font-extralight' >7 màu</span>
      </a>
    </div>
  )
}

export default ProductCard