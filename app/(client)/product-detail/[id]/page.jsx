'use client'
import React from 'react'
import { useParams } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import { useState  } from 'react';
import { useEffect } from 'react';
import { FormatCurrency } from '@/utils/FormatCurrency';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { publicRequest } from '@/requestMethod';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist } from '@/redux/wishlistRedux';
import { userRequest } from '@/requestMethod';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { setCart } from '@/redux/cartRedux';
import Loader from '@/components/Loader';
import SuccessPopup from '@/components/Popup/SuccessPopup';

const ProductDetail = () => {

    const [notifyPopup, setNotifyPopup] = useState(false)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser)
    const wishlist = useSelector((state) => state.wishlist.userWishlist)
    const wishlistArray = []
    const productId = useParams().id
    const [size, setSize]=useState("")
    const [color, setColor]=useState("")
    const [product, setProduct]=useState({})
  
    //  add to wishlistArray
    wishlist?.products?.map((item)=> wishlistArray.push(item._id)) 
  
  const addToWishlist = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await userRequest.post(`/wishlist/${user._id}`, {
        productId: productId
      })
      if(res.data){
        dispatch(setWishlist(res.data.wishlist))
        setLoading(false)
        
      }

    } catch(err) {
      console.log(err)
    }

  }
  const addToCart = async (e) => {
    setLoading(true)
    e.preventDefault()
    try{
      const res = await userRequest.post(`/cart/${user._id}`, {
        productId: productId,
        name: product.name,
        quantity: 1,
        color: color, 
        size: size
      }) 
      if(res.data){
        dispatch(setCart(res.data.cart))
        setLoading(false)
        setNotifyPopup(true)
        setTimeout(()=> {
          setNotifyPopup(false)
        }, 3000)
      }

    }catch(err){
      console.log(err)
    }
    
  }

  //fetch data
    useEffect(()=> {
      const getProduct = async () => {
        try {
          const res = await publicRequest.get(`/product/${productId}`)
          if(res.data) {
            setProduct(res.data)
            setLoading(false)
          }
        } catch {}
      };
      getProduct();
      
    }, [])
    
    // close the popup
    const handleClosePopup = () => {
      setNotifyPopup(false)
  }

  console.log()
  return (
  
    <div className={` px-4 md:px-8  xl:px-32  mb-20 ${loading?'bg-white opacity-50':''} `} >
     {loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
     {notifyPopup ? 
            
                <SuccessPopup  message={'Thêm thành công!'}  handleClosePopup={handleClosePopup}   /> 
             : '' }
      <div className='flex flex-col  md:flex-row  mt-20  ' >
        {/* product image gallery */}
        <div className='w-full  md:w-2/4 ' > 
          <ProductGallery thumbnail={product.thumbnail}  product_images={product.imgGallery} />
        </div>
        {/* product short desciption */}
        <div className='w-full  xl:w-2/3 px-4 md:px-10 py-5  space-y-4' >
          <div className='text-4xl font-bold' > {product.name}</div>
          <div className='text-2xl font-bold' > {FormatCurrency(product.price)} đ </div>
          <div> {product.desc}</div>
          <hr className='border-2 border-gray-300' />
          {/* size */}
          <div className='font-bold' > 
            Size : {size} 
          </div>
          {/* {product.size} */}
          {String(product.size).length === 0  ? '' :
            <div className='  flex flex-wrap  '>
              
              {product.size?.map((s,index)=>(
                  <span 
                    key={index}
                    onClick={()=>setSize(s)}
                    className = {` border-gray-400 border-4  text-center transition rounded py-2 ml-1 mt-1 w-20 h-12 hover:border-gray-500
                      ${s===size?'bg-black border-4 border-black text-white ':''} `} 
                  >
                    {s}
                  </span>
                )) 
              }
            </div> 
          }            

          {/* color */}
          <div className='font-bold' >
            Color : {color}
          </div>
          <div className='flex flex-swap  ' >
            {String(product.color).length !== 0 &&
            product.color?.map((c,index)=>(
              <p 
              onClick={()=>setColor(c)}
              className={`object-cover ml-1 mt-1 hover:border-gray-500 hover:border-4 transition rounded border-4 p-4 ${c===color?'border-black border-4':'' } `}
              key={index} width='80px'  
              src={c} alt="" >
              {c}
              </p>
            ))
            }
          </div>
          {/* add to cart */}
          <hr className='border-2 border-gray-300 '/>
          <div className='flex  ' >
            {/* <div className='border-gray-400 border-4 mr-1 flex p-1 ' >
              <span className='hover:bg-black hover:text-white transition  ' >
                <RemoveIcon   sx={{fontSize:50}} />
              </span>
              <span className='text-4xl py-1 font-bold ' >1</span>
              <span className='hover:bg-black hover:text-white transition ' >
                <AddIcon sx={{fontSize:50}} />
              </span>
            </div> */}
            <button 
                onClick={addToCart}
                className='bg-black text-white font-bold text-xl md:text-2xl p-1 md:p-3  w-full hover:text-gray-500 transition ' >
                  Thêm vào giỏ hàng
            </button>

          </div>
          
         
         <button  
              onClick = {addToWishlist}
              className='p-2 py-2 md:px-5 border-gray-400 ml border-4 hover:border-gray-black hover:border-black transition ' >
                 {wishlistArray.includes(productId) ? <FavoriteIcon sx={{fontSize:40}} />  : <FavoriteBorderIcon sx={{fontSize:40}} />}
           
            <span className='font-bold text-xl ml-2' >
            {wishlistArray.includes(productId) ? 'Đã thêm vào wishlist'  : 'Thêm vào wishlist' }
            </span> 
          </button> 
         
            
        </div>

      </div>
      <div className='border-b-2 mt-2 border-black mx-96' ></div>
      {/* Product description  */}
      <div className='mt-10' >
            <h1 className='text-4xl font-bold text-center' >  Mô tả</h1>
            <p>{product.desc}</p>
      </div>
        
    
    </div>
  )
}

export default ProductDetail